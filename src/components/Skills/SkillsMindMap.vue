<template>
    <div id="mind-map-container" ref="mindMap"></div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref, nextTick } from "vue";

const mindMap = ref(null);

const props = defineProps({
    skills: {
        type: Object,
        required: true,
    },
});

const drawMindMap = () => {
    const margin = [20, 120, 20, 20];
    const width = 1280 - margin[1] - margin[3];
    const height = 800 - margin[0] - margin[2];
    let i = 0;

    const tree = d3.tree().size([height, width]);
    const diagonal = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);

    const svg = d3
        .select(mindMap.value)
        .append("svg")
        .attr("width", width + margin[1] + margin[3])
        .attr("height", height + margin[0] + margin[2])
        .append("g")
        .attr("transform", `translate(${margin[3]},${margin[0]})`);

    let root = d3.hierarchy(props.skills);
    root.x0 = height / 2;
    root.y0 = 0;

    const update = (source) => {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        nodes.forEach((d) => {
            d.y = d.depth * 180;
        });

        const node = svg
            .selectAll("g.node")
            .data(nodes, (d) => d.id || (d.id = ++i));

        const nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", `translate(${source.y0},${source.x0})`)
            .on("click", (event, d) => {
                toggle(d);
                update(d);
            });

        nodeEnter
            .append("circle")
            .attr("r", 1e-6)
            .style("fill", (d) => (d._children ? "lightsteelblue" : "#fff"));

        nodeEnter
            .append("a")
            .attr("xlink:href", (d) => d.data.url || null)
            .append("text")
            .attr("x", (d) => (d.children || d._children ? -10 : 10))
            .attr("dy", ".35em")
            .attr("text-anchor", (d) =>
                d.children || d._children ? "end" : "start"
            )
            .text((d) => d.data.name)
            .style("fill", (d) => (d.data.free ? "black" : "#999"))
            .style("fill-opacity", 1e-6);

        nodeEnter
            .append("title")
            .text((d) => d.data.description || "");

        const nodeUpdate = node
            .merge(nodeEnter)
            .transition()
            .duration(500)
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle").attr("r", 6).style("fill", (d) =>
            d._children ? "lightsteelblue" : "#fff"
        );

        nodeUpdate.select("text").style("fill-opacity", 1);

        const nodeExit = node
            .exit()
            .transition()
            .duration(500)
            .attr("transform", `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle").attr("r", 1e-6);

        nodeExit.select("text").style("fill-opacity", 1e-6);

        const link = svg
            .selectAll("path.link")
            .data(links, (d) => d.target.id);

        const linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", (d) => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });

        linkEnter
            .merge(link)
            .transition()
            .duration(500)
            .attr("d", diagonal);

        link.exit()
            .transition()
            .duration(500)
            .attr("d", (d) => {
                const o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        nodes.forEach((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    const toggle = (d) => {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
    };

    const toggleAll = (d) => {
        if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
        }
    };

    toggleAll(root);
    update(root);
};

onMounted(async () => {
    await nextTick();
    drawMindMap();
});
</script>

<style scoped>
.node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 3px;
}

.node text {
    font: 12px sans-serif;
}

.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
}
</style>