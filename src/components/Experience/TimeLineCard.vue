<template>
    <article class="panel p-5 transition hover:border-accent/40 sm:p-6">
        <header class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h3 class="text-lg font-bold text-ink">{{ experience.position }}</h3>
                <p class="text-accent">{{ experience.company }}</p>
                <p v-if="experience.location" class="text-sm text-ink-muted">{{ experience.location }}</p>
            </div>
            <span class="chip self-start whitespace-nowrap"
                :class="{ 'border-accent/50 text-accent': experience.current }">{{ experience.period }}</span>
        </header>

        <ul class="mt-4 space-y-2">
            <li v-for="(activity, actIndex) in experience.activities" :key="actIndex"
                class="flex gap-3 leading-relaxed text-ink/80">
                <span class="font-mono text-accent select-none" aria-hidden="true">›</span>
                <span>{{ activity }}</span>
            </li>
        </ul>

        <div v-if="experience.technologies?.length" class="mt-5 flex flex-wrap gap-1.5 border-t border-edge pt-4">
            <span v-for="(tech, techIndex) in experience.technologies" :key="techIndex" class="chip">
                {{ tech }}
            </span>
        </div>
    </article>
</template>

<script setup>
defineProps({
    experience: {
        type: Object,
        required: true
    }
});
</script>
