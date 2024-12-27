<template>
    <!-- Scrollable content -->
    <div class="timeline-content">
        <div class="container py-4" v-for="(experience, index) in sortedExperiences" :key="index">
            <div class="row mb-5">
                <div class="col-12 col-md-6">
                    <div v-if="index % 2 !== 0">
                        <div class="d-flex justify-content-end align-items-end card-container">
                            <TimeLineCard :experience="experience" :isOdd="false" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div v-if="index % 2 === 0">
                        <div class="d-flex justify-content-start align-items-start card-container">
                            <TimeLineCard :experience="experience" :isOdd="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import TimeLineCard from './TimeLineCard.vue';

const props = defineProps({
    experienceData: {
        type: Object,
        required: true
    }
});

const sortedExperiences = computed(() => {
    return [...props.experienceData.experiences].sort((a, b) => {
        const dateA = new Date(a.period.split('-')[0]);
        const dateB = new Date(b.period.split('-')[0]);
        return dateB - dateA;
    });
});
</script>

<style scoped>
.timeline-content::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -2px;
    border-right: 2px dashed #4b546f;
    height: 100%;
    display: block;
    z-index: -1;
}

.timeline-line {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,
            transparent 0%,
            var(--bs-primary) 5%,
            var(--bs-primary) 95%,
            transparent 100%);
}

.timeline-content {
    position: relative;
    z-index: 2;
}

.card-container {
    margin-inline: 2rem;
}

@media (max-width: 768px) {
    .timeline-line-container {
        left: 20px;
    }
}
</style>