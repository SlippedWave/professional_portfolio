<template>
    <div class="table-responsive">
        <table class="table table-hover w-100">
            <thead>
                <tr>
                    <th style="width: 100%">Skills Overview</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(skill, index) in skillsData" :key="index">
                    <tr>
                        <td>
                            <div class="skill-row">
                                <!-- Main Category -->
                                <div class="category-column">
                                    <div class="category">
                                        {{ skill.name }}
                                    </div>
                                </div>

                                <!-- First Level Children -->
                                <div class="children-column" v-if="skill.children">
                                    <div v-for="(child, childIndex) in skill.children" :key="childIndex"
                                        @click="toggleSubcategory(index, childIndex)" class="child-item"
                                        :class="{ 'active': isExpanded(index, childIndex) }">
                                        <i :class="isExpanded(index, childIndex) ? 'bi bi-chevron-down' : 'bi bi-chevron-right'"
                                            class="me-2"></i>
                                        {{ child.name }}
                                    </div>
                                </div>

                                <!-- Details (shown when child is expanded) -->
                                <div class="details-column" v-if="hasExpandedItem(index)">
                                    <template v-for="(child, childIndex) in skill.children" :key="childIndex">
                                        <div v-if="isExpanded(index, childIndex)" class="skill-details">
                                            <div class="skill-description">{{ child.description }}</div>
                                            <ul v-if="child.children" class="list-unstyled mt-2">
                                                <li v-for="(subskill, subIndex) in child.children" :key="subIndex"
                                                    class="skill-item">
                                                    <strong>{{ subskill.name }}</strong>
                                                    <span class="text-muted small ms-2">{{ subskill.description
                                                        }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    skillsData: {
        type: Array,
        required: true
    }
});

const expandedItems = ref({});

const hasExpandedItem = (categoryIndex) => {
    return Object.keys(expandedItems.value)
        .some(key => key.startsWith(`${categoryIndex}-`) && expandedItems.value[key]);
};

const toggleSubcategory = (categoryIndex, subcategoryIndex) => {
    const key = `${categoryIndex}-${subcategoryIndex}`;
    expandedItems.value[key] = !expandedItems.value[key];
};

const isExpanded = (categoryIndex, subcategoryIndex) => {
    const key = `${categoryIndex}-${subcategoryIndex}`;
    return expandedItems.value[key];
};
</script>

<style scoped>
.skill-row {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    transition: all 0.3s ease;
}

.category-column {
    min-width: 200px;
    flex-shrink: 0;
}

.children-column {
    min-width: 250px;
    flex-shrink: 0;
}

.details-column {
    flex-grow: 1;
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 0.3s ease forwards;
}

.child-item {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
}

.child-item:hover {
    background-color: rgba(74, 144, 226, 0.1);
}

.child-item.active {
    background-color: rgba(74, 144, 226, 0.15);
    font-weight: 500;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.skill-details {
    padding: 0.5rem;
    background-color: rgba(74, 144, 226, 0.05);
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.skill-item {
    margin-bottom: 0.25rem;
    padding: 0.25rem 0;
}

.bi {
    transition: transform 0.2s ease;
}

.table {
    table-layout: fixed;
    width: 100%;
}

td {
    vertical-align: top;
    padding: 1rem;
}

.skills-list {
    max-height: 500px;
    overflow-y: auto;
}

td,
th {
    transition: all 0.3s ease;
    overflow: hidden;
}

td:not(.expanded),
th:not(.expanded) {
    padding: 0;
    width: 0;
    opacity: 0;
}

.category {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.category:hover {
    background-color: rgba(74, 144, 226, 0.1);
}

.category.active {
    background-color: rgba(74, 144, 226, 0.15);
    font-weight: 500;
}

.subcategories {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.subcategories.visible {
    opacity: 1;
    transform: translateX(0);
}

.skills-list {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

td.expanded .skills-list {
    opacity: 1;
    transform: translateX(0);
}

.table {
    table-layout: fixed;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}
</style>
