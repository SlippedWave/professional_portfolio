<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import * as d3 from 'd3';
import { Modal } from 'bootstrap';

const mindMap = ref(null);
const modalRef = ref(null);
const modalTitle = ref('');
const modalDescription = ref('');

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

const { locale } = useI18n();

const showModal = (title, description) => {
    modalTitle.value = title;
    modalDescription.value = description;
    const modal = new Modal(modalRef.value);
    modal.show();
};

const drawMindMap = async () => {
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

    let skillsData = await getSkillsJson(locale.value);
    console.log('Skills Data:', skillsData);

    let root = d3.hierarchy(skillsData);
    console.log('Hierarchy Root:', root);

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
                showModal(d.data.name, d.data.description);
            })
            .on("mouseover", (event, d) => {
                d3.select(event.currentTarget).select("circle").style("fill", "#ffeb3b");
            })
            .on("mouseout", (event, d) => {
                d3.select(event.currentTarget).select("circle").style("fill", "#fff");
            });

        nodeEnter
            .append("circle")
            .attr("r", 10)
            .style("fill", "#fff")
            .style("stroke", "#000")
            .style("stroke-width", "3px");

        nodeEnter
            .append("text")
            .attr("dy", ".35em")
            .attr("x", (d) => (d.children || d._children ? -13 : 13))
            .attr("text-anchor", (d) => (d.children || d._children ? "end" : "start"))
            .text((d) => d.data.name);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
            .transition()
            .duration(200)
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        nodeUpdate
            .select("circle")
            .attr("r", 10)
            .style("fill", "#fff");

        nodeUpdate
            .select("text")
            .style("fill-opacity", 1);

        const nodeExit = node
            .exit()
            .transition()
            .duration(200)
            .attr("transform", (d) => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit
            .select("circle")
            .attr("r", 1e-6);

        nodeExit
            .select("text")
            .style("fill-opacity", 1e-6);

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
            .duration(200)
            .attr("d", diagonal);

        link
            .exit()
            .transition()
            .duration(200)
            .attr("d", (d) => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            })
            .remove();

        nodes.forEach((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    update(root);
};

onMounted(() => {
    drawMindMap();
});
</script>

<template>
    <div ref="mindMap"></div>

    <!-- Modal -->
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ modalDescription }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.node circle {
    cursor: pointer;
    transition: fill 0.3s;
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