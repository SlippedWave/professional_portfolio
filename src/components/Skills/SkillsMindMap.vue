<template>
    <div class="mind-map-wrapper">
        <div ref="mindMap" class="mind-map"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, createVNode, render, defineProps, nextTick } from 'vue';
import * as d3 from 'd3';
import SkillNode from './SkillNode.vue';

const props = defineProps({
    skillsData: {
        type: Object,
        required: true
    }
});

const mindMap = ref(null);
const currentScale = ref(1);

const calculateNodeHeight = (d) => {
    // Base height for node content
    const baseHeight = 100;

    // Additional height for expanded nodes with children
    const childrenHeight = d.children ? (d.children.length * 80) : 0;

    // Total height with padding
    return baseHeight + childrenHeight + 40; // 40px extra padding
};

const drawMindMap = () => {
    if (!mindMap.value) return;

    mindMap.value.innerHTML = '';

    const containerWidth = mindMap.value.clientWidth;
    const containerHeight = mindMap.value.clientHeight;
    const width = Math.max(containerWidth, 2000);
    const height = Math.max(containerHeight, 1000);

    const centerX = width / 2;
    const centerY = height / 2;

    const svg = d3.select(mindMap.value)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("display", "block");

    const zoom = d3.zoom()
        .scaleExtent([1, 4])
        .on("zoom", (event) => {
            currentScale.value = event.transform.k;
            container.attr("transform", event.transform);
        });

    svg.call(zoom);

    const container = svg.append("g")
        .attr("transform", `translate(${centerX},${centerY})`);

    const tree = d3.tree()
        .nodeSize([300, 600]) // Increased vertical spacing
        .separation((a, b) => {
            const heightA = calculateNodeHeight(a);
            const heightB = calculateNodeHeight(b);

            // Minimum separation based on node heights
            const minSeparation = (heightA + heightB) / 200;

            // Base separation multiplier
            const baseSeparation = a.parent === b.parent ? 1.2 : 2;

            return Math.max(baseSeparation, minSeparation);
        });

    const diagonal = (d) => {
        const sourceX = d.source.x;
        const sourceY = d.source.y;
        const targetX = d.target.x;
        const targetY = d.target.y;


        // Calculate actual connection points
        const sourcePoint = {
            x: sourceX,
            y: sourceY + 200  // Connect from the right edge of source
        };

        const targetPoint = {
            x: targetX,
            y: targetY - 100  // Connect to the left edge of target with small offset
        };

        // Adjust control points for smoother curve
        const deltaY = targetPoint.y - sourcePoint.y;
        const controlY1 = sourcePoint.y + deltaY * 0.25;
        const controlY2 = sourcePoint.y + deltaY * 0.75;

        return `M ${sourcePoint.y},${sourcePoint.x}
                C ${controlY1},${sourcePoint.x}
                  ${controlY2},${targetPoint.x}
                  ${targetPoint.y},${targetPoint.x}`;
    };

    const root = d3.hierarchy(props.skillsData);
    root.x0 = 0;
    root.y0 = 0;

    // Initialize root node - modified to only collapse beyond first level
    root.descendants().forEach((d, i) => {
        d.id = i;
        // Only collapse nodes beyond the first level of children
        if (d.depth > 0) {
            d._children = d.children;
            d.children = null;
        }
    });

    function update(source) {
        const nodes = tree(root);
        const descendants = nodes.descendants();
        const links = nodes.links();

        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        descendants.forEach(d => {
            minX = Math.min(minX, d.x);
            maxX = Math.max(maxX, d.x);
            minY = Math.min(minY, d.y);
            maxY = Math.max(maxY, d.y);
        });

        const offsetX = -((maxX + minX) / 2);
        const offsetY = -((maxY + minY) / 2);

        descendants.forEach(d => {
            d.x += offsetX;
            d.y += offsetY;
        });

        // Adjust positions to prevent overlaps
        descendants.forEach(d => {
            if (d.parent) {
                const siblings = d.parent.children;
                const index = siblings.indexOf(d);

                if (index > 0) {
                    const prevSibling = siblings[index - 1];
                    const minDistance = (calculateNodeHeight(prevSibling) + calculateNodeHeight(d)) / 2;

                    // Check if nodes are too close
                    if (d.x - prevSibling.x < minDistance) {
                        // Move current node and all following siblings down
                        const offset = minDistance - (d.x - prevSibling.x);
                        for (let i = index; i < siblings.length; i++) {
                            siblings[i].x += offset;
                        }
                    }
                }
            }
        });

        const duration = 750;

        // Create nodes first
        const node = container.selectAll("g.node")
            .data(descendants, d => d.id);

        // Node enter with initial position
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`);

        nodeEnter.append("foreignObject")
            .attr("width", 300)
            .attr("height", 300)
            .attr("x", -100)
            .attr("y", -60)
            .each(function (d) {
                const container = this;
                const vNode = createVNode(SkillNode, {
                    hasChildren: !!(d.children || d._children),
                    skillName: d.data.name,
                    skillDetails: d.data.description,
                    onNodeClick: () => toggleChildren(null, d)
                });
                render(vNode, container);
            });

        // Update nodes with transition
        const nodeUpdate = nodeEnter.merge(node)
            .transition("nodeTransition")
            .duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // Exit nodes with transition
        const nodeExit = node.exit()
            .transition("nodeExit")
            .duration(duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        // Wait for node transitions to complete before animating links
        nodeUpdate.end().then(() => {
            // Update links after nodes are in position
            const link = container.selectAll("path.link")
                .data(links, d => d.target.id);

            // Enter links
            const linkEnter = link.enter()
                .insert("path", "g")
                .attr("class", "link")
                .style("stroke", "#4A90E2")
                .style("stroke-width", "2px")
                .style("fill", "none")
                .attr("d", d => {
                    const o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });

            // Update links with transition
            const linkUpdate = link.merge(linkEnter)
                .transition("linkTransition")
                .duration(duration * 0.8) // Slightly faster than nodes
                .attr("d", diagonal)
                .style("stroke-width", d => Math.max(1, 8 / d.target.depth) + "px")
                .style("stroke-dasharray", "5,0"); // Solid line, adjust if you want dashed

            // Exit links with transition
            link.exit()
                .transition("linkExit")
                .duration(duration * 0.8)
                .attr("d", d => {
                    const o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .style("opacity", 0)
                .remove();
        });

        // Store positions for next transition
        descendants.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function toggleChildren(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        if (d.parent) {
            d.parent.children.forEach(sibling => {
                if (sibling !== d && sibling.children) {
                    sibling._children = sibling.children;
                    sibling.children = null;
                }
            });
        }

        update(d);
    }

    update(root);

};

onMounted(() => {
    nextTick(() => {
        drawMindMap();
        window.addEventListener('resize', () => {
            nextTick(drawMindMap);
        });
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', drawMindMap);

    const container = mindMap.value;
    if (container) {
        container.innerHTML = '';
    }
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

svg {
    width: 100%;
    height: 100%;
}

.node {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.foreignObject {
    transition: all 0.3s ease;
    overflow: visible;
}

.link {
    fill: none;
    stroke: #4A90E2;
    stroke-width: 2px;
    stroke-linecap: round;
    pointer-events: none;
    opacity: 1;
    transition: all 0.3s ease;
}
</style>