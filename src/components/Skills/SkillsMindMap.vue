<template>
    <div class="mind-map-wrapper">
        <div ref="mindMap" class="mind-map"></div>
    </div>
</template>

<script setup>
import { ref, reactive, h, onMounted, onUnmounted, createVNode, render, nextTick } from 'vue';
import * as d3 from 'd3';
import SkillNode from './SkillNode.vue';

const props = defineProps({
    skillsData: {
        type: Object,
        required: true
    }
});

const mindMap = ref(null);

// Node card geometry relative to its tree position (card is 280px wide)
const NODE_LEFT = -100;
const NODE_RIGHT = 180;
const NODE_HALF_HEIGHT = 26;
const NODE_SPACING = 110;
const LEVEL_SPACING = 380;

// Unmount Vue nodes rendered into foreignObjects before clearing the SVG
const clearMindMap = () => {
    if (!mindMap.value) return;
    mindMap.value.querySelectorAll('foreignObject').forEach(el => render(null, el));
    mindMap.value.innerHTML = '';
};

const drawMindMap = () => {
    if (!mindMap.value) return;

    clearMindMap();

    const width = mindMap.value.clientWidth;
    const height = mindMap.value.clientHeight;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? 0 : 500;

    const svg = d3.select(mindMap.value)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("display", "block");

    const zoom = d3.zoom()
        .scaleExtent([0.3, 2])
        .on("zoom", (event) => {
            container.attr("transform", event.transform);
        });

    svg.call(zoom);

    const container = svg.append("g");
    // Separate layers keep links under nodes regardless of insertion order
    const gLink = container.append("g")
        .attr("fill", "none")
        .attr("stroke", "rgba(254, 128, 25, 0.5)")
        .attr("stroke-linecap", "round");
    const gNode = container.append("g");

    const tree = d3.tree()
        .nodeSize([NODE_SPACING, LEVEL_SPACING])
        // Open description text on the upper neighbour pushes the lower one down
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.4) + detailsHeight(upperOf(a, b)) / NODE_SPACING);

    // d3 doesn't guarantee argument order; compare positions among the nearest sibling ancestors
    const upperOf = (a, b) => {
        let x = a;
        let y = b;
        while (x.parent !== y.parent) {
            x = x.parent;
            y = y.parent;
        }
        const siblings = x.parent?.children ?? [];
        return siblings.indexOf(x) < siblings.indexOf(y) ? a : b;
    };

    // Horizontal cubic link from the right edge of the source card to the left edge of the target card
    const diagonal = ({ source, target }) => {
        const sx = source.y + NODE_RIGHT;
        const tx = target.y + NODE_LEFT;
        const mid = (sx + tx) / 2;
        return `M${sx},${source.x}C${mid},${source.x} ${mid},${target.x} ${tx},${target.x}`;
    };

    // Where a removed node folds into: its closest ancestor still visible after the update
    const visibleAncestor = (d, visible) => {
        let a = d.parent;
        while (a && !visible.has(a)) a = a.parent;
        return a ?? d;
    };

    // Ids of nodes whose description text is open; shared so siblings can be closed together
    const openDetails = reactive(new Set());

    // Stateful wrapper so each node re-renders when openDetails changes
    const SkillNodeHost = {
        props: { node: Object },
        setup(hostProps) {
            return () => {
                const d = hostProps.node;
                return h(SkillNode, {
                    hasChildren: !!(d.children || d._children),
                    skillName: d.data.name,
                    skillDetails: d.data.description,
                    detailsOpen: openDetails.has(d.id),
                    onToggleDetails: () => toggleDetails(d),
                    onNodeClick: () => toggleChildren(d)
                });
            };
        }
    };

    // Rough rendered height of a node's open description (~36 chars per 20px line inside the 280px card)
    const detailsHeight = d => (openDetails.has(d.id)
        ? Math.ceil((d.data.description?.length ?? 0) / 36) * 20 + 16
        : 0);

    const siblingsOf = d => (d.parent ? d.parent.children.filter(s => s !== d) : []);

    // Opening one node's text closes any open sibling text
    function toggleDetails(d) {
        if (openDetails.has(d.id)) {
            openDetails.delete(d.id);
        } else {
            siblingsOf(d).forEach(s => openDetails.delete(s.id));
            openDetails.add(d.id);
        }
        // Reflow so siblings slide out from under the text
        update(d);
    }

    const root = d3.hierarchy(props.skillsData);
    root.x0 = 0;
    root.y0 = 0;

    root.descendants().forEach((d, i) => {
        d.id = i;
        // Start with only the first level visible
        if (d.depth > 0) {
            d._children = d.children;
            d.children = null;
        }
    });

    function update(source) {
        tree(root);
        const nodes = root.descendants();
        const links = root.links();
        const visible = new Set(nodes);

        // One shared transition keeps nodes and links moving in sync
        const transition = svg.transition().duration(duration).ease(d3.easeCubicInOut);

        const node = gNode.selectAll("g.node").data(nodes, d => d.id);

        // New nodes grow out of the clicked node's previous position
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", `translate(${source.y0},${source.x0})`)
            .style("opacity", 0)
            // Bring clicked node above siblings so expanded details aren't covered
            .on("click", function () { d3.select(this).raise(); });

        nodeEnter.append("foreignObject")
            .attr("width", 300)
            .attr("height", 300)
            .attr("x", NODE_LEFT)
            .attr("y", -NODE_HALF_HEIGHT)
            // Box is larger than the card; let clicks through the empty area
            .style("pointer-events", "none")
            .style("overflow", "visible")
            .each(function (d) {
                render(createVNode(SkillNodeHost, { node: d }), this);
            });

        node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .style("opacity", 1);

        // Removed nodes fold back into their nearest visible ancestor
        node.exit()
            .style("pointer-events", "none")
            .transition(transition)
            .attr("transform", d => {
                const a = visibleAncestor(d, visible);
                return `translate(${a.y},${a.x})`;
            })
            .style("opacity", 0)
            .on("end", function () {
                d3.select(this).selectAll("foreignObject").each(function () { render(null, this); });
            })
            .remove();

        const link = gLink.selectAll("path").data(links, d => d.target.id);

        const linkEnter = link.enter().append("path")
            .attr("stroke-width", d => Math.max(1, 8 / d.target.depth))
            .attr("stroke-opacity", 0)
            .attr("d", () => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });

        link.merge(linkEnter).transition(transition)
            .attr("d", diagonal)
            .attr("stroke-opacity", 1);

        link.exit().transition(transition)
            .attr("d", d => {
                const a = visibleAncestor(d.target, visible);
                return diagonal({ source: a, target: a });
            })
            .attr("stroke-opacity", 0)
            .remove();

        // Hidden nodes shouldn't keep their text open for when they reappear
        const visibleIds = new Set(nodes.map(n => n.id));
        [...openDetails].forEach(id => {
            if (!visibleIds.has(id)) openDetails.delete(id);
        });

        // Store positions for the next transition
        root.eachBefore(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Pan + zoom so the expanded node sits left of center and all its children fit vertically
    function focusNode(d) {
        const xs = [d, ...d.children].map(n => n.x);
        const top = Math.min(...xs);
        const bottom = Math.max(...xs);
        const span = bottom - top + NODE_SPACING * 1.5;
        const k = Math.max(0.45, Math.min(1, height / span));
        const target = d3.zoomIdentity
            .translate(width * 0.25 - k * d.y, height / 2 - k * (top + bottom) / 2)
            .scale(k);
        svg.transition("camera").duration(duration).ease(d3.easeCubicInOut).call(zoom.transform, target);
    }

    function toggleChildren(d) {
        const expanding = !d.children;
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        // Expanding or collapsing a branch closes any open sibling text
        siblingsOf(d).forEach(s => openDetails.delete(s.id));

        // Accordion: only one open branch per level
        if (expanding && d.parent) {
            d.parent.children.forEach(sibling => {
                if (sibling !== d && sibling.children) {
                    sibling._children = sibling.children;
                    sibling.children = null;
                }
            });
        }

        update(d);
        if (expanding) focusNode(d);
    }

    update(root);

    // Fit the initial tree inside the panel; zoom transform owns the translation so panning doesn't jump
    const xs = root.descendants().map(d => d.x);
    const ys = root.descendants().map(d => d.y);
    const treeHeight = Math.max(...xs) - Math.min(...xs) + NODE_SPACING * 2;
    const treeWidth = Math.max(...ys) - Math.min(...ys) + NODE_RIGHT - NODE_LEFT + 80;
    const scale = Math.min(1, height / treeHeight, width / treeWidth);
    const midX = (Math.max(...xs) + Math.min(...xs)) / 2;
    const midY = (Math.max(...ys) + Math.min(...ys) + NODE_LEFT + NODE_RIGHT) / 2;
    svg.call(zoom.transform, d3.zoomIdentity
        .translate(width / 2 - scale * midY, height / 2 - scale * midX)
        .scale(scale));
};

let resizeTimer = null;
const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawMindMap, 200);
};

onMounted(() => {
    nextTick(() => {
        drawMindMap();
        window.addEventListener('resize', handleResize);
    });
});

onUnmounted(() => {
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', handleResize);
    clearMindMap();
});
</script>

<style scoped>
.mind-map-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.mind-map {
    width: 100%;
    height: 100%;
}
</style>
