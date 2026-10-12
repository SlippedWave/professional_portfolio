<template>
    <div class="relative ml-3 sm:ml-4">
        <!-- Dashed rail that fades out at both ends -->
        <span aria-hidden="true"
            class="absolute inset-y-0 left-0 w-px bg-[repeating-linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink-muted)_40%,transparent)_0_6px,transparent_6px_12px)] [mask-image:linear-gradient(to_bottom,transparent,black_2.5rem,black_calc(100%_-_2.5rem),transparent)]"></span>
        <ol class="relative">
        <li v-for="(experience, index) in sortedExperiences" :key="experience.company + experience.period"
            class="relative pb-10 pl-8 last:pb-0 sm:pl-10" v-motion :initial="{ opacity: 0, x: -20 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: index * 80, duration: 400 } }">
            <span class="absolute top-5 -left-[7.5px] size-4 rounded-full border-2 border-accent bg-canvas"
                :class="{ 'bg-accent shadow-[0_0_12px] shadow-accent/70': index === 0 }" aria-hidden="true"></span>
            <TimeLineCard :experience="experience" />
        </li>
        </ol>
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

// "M/YYYY - M/YYYY" -> sortable number from the start date
const startKey = (period) => {
    const [month, year] = period.split('-')[0].trim().split('/').map(Number);
    return year * 12 + month;
};

const sortedExperiences = computed(() => {
    return [...props.experienceData.experiences].sort((a, b) => startKey(b.period) - startKey(a.period));
});
</script>
