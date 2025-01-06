<template>
    <div class="node-wrapper">
        <div class="node shadow-sm" :class="{ 'has-children': hasChildren }">
            <div class="content-wrapper">
                <div class="main-content">
                    <h3>{{ skillName }}</h3>
                    <button class="btn btn-sm info-btn" @click="showDetails = !showDetails">
                        {{ showDetails ? '&#x25B2' : '&#x25BC' }}
                    </button>
                </div>
                <button v-if="hasChildren" class="btn btn-sm toggle-btn" @click="$emit('nodeClick')">
                    >
                </button>
            </div>
            <div class="details-section" v-if="showDetails">
                <small>{{ skillDetails }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    hasChildren: Boolean,
    skillName: String,
    skillDetails: String,
});

const showDetails = ref(false);

defineEmits(['nodeClick']);
</script>

<style scoped>
.node {
    width: 300px;
    height: 100%;
    background: rgba(74, 144, 226, 0.1);
    border: 2px solid #4A90E2;
    color: aliceblue;
    padding: 8px;
}

.content-wrapper {
    display: flex;
    align-items: stretch;
    gap: 8px;

}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.toggle-btn {
    align-self: stretch;
    padding: 0 0.4rem;
    font-size: 0.9rem;
    color: #4A90E2;
    background: transparent;
    border: 1px solid #4A90E2;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-btn {
    padding-inline: 3rem;
    font-size: 1rem;
    color: #4A90E2;
    background: transparent;
    border: 1px solid #4A90E2;
    border-radius: 4px;
}

.details-section {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    text-align: left;
}

.details-section.show {
    padding-top: 4px;
    border-top: 1px solid rgba(74, 144, 226, 0.2);
}

.toggle-btn:hover,
.info-btn:hover {
    background: rgba(74, 144, 226, 0.1);
}
</style>
