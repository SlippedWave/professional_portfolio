<template>
    <div ref="mindMap"></div>
    <div ref="popover" class="popover" v-show="showPopover">
        <p>{{ popoverContent }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import * as d3 from 'd3';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const mindMap = ref(null);
const popover = ref(null);
const showPopover = ref(false);
const popoverContent = ref('');

const getSkillsJson = async (locale) => {
    let json;

    switch (locale) {
        case 'en':
            json = await import('@/assets/data/skills_en.json');
            break;
        case 'es':
            json = await import('@/assets/data/skills_es.json');
            break;
        case 'de':
            json = await import('@/assets/data/skills_de.json');
            break;
        default:
            json = await import('@/assets/data/skills_en.json');
            break;
    }

    return json.default;
};


const drawMindMap = async () => {
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    let i = 0;

    const tree = d3.tree().size([height, width]);
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

    const svg = d3.select(mindMap.value)
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const skillsData = await getSkillsJson(locale.value);
    const root = d3.hierarchy(skillsData);
    root.x0 = 0;
    root.y0 = 0;

    const update = (source) => {
        const nodes = tree(root).descendants();
        const links = tree(root).links();

        nodes.forEach(d => d.y = d.depth * 180);

        const node = svg.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on("click", async (event, d) => {
                showPopover.value = true;
                popoverContent.value = d.data.description || 'No description available';
                await nextTick();
                const [x, y] = d3.pointer(event);
                popover.value.style.left = `${x + 10}px`;
                popover.value.style.top = `${y + 10}px`;
            });

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", d => d.children ? "lightsteelblue" : "#fff");

        nodeEnter.append("text")
            .attr("x", d => d.children || d.children ? -13 : 13)
            .attr("dy", ".35em")
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name)
            .style("fill-opacity", 1e-6);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(750)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", d => d.children ? "lightsteelblue" : "#fff");

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        const nodeExit = node.exit().transition()
            .duration(750)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        const link = svg.selectAll("path.link")
            .data(links, d => d.target.id);

        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });

        linkEnter.merge(link).transition()
            .duration(750)
            .attr("d", diagonal);

        link.exit().transition()
            .duration(750)
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    update(root);
};



onMounted(() => {
    drawMindMap();
});

document.addEventListener('click', (e) => {
    if (popover.value && !popover.value.contains(e.target)) {
        showPopover.value = false;
    }
});
</script>

<style scoped>
.popover {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* Optional: make it look better */
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
    /* Allow interaction with the popover */
    z-index: 1000;
    /* Ensure it appears above other elements */
}

.popover {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    transform: scale(0.95);
    /* Popover will grow in when shown */
    opacity: 0;
}

.popover[v-show="true"] {
    transform: scale(1);
    opacity: 1;
}

.node {
    cursor: pointer;
}

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