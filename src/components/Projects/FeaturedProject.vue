<script setup>
import { useI18n } from 'vue-i18n';
import Icon from '@/components/shared/Icon.vue';

const { t } = useI18n();

defineProps({
    project: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <article class="panel flex h-full flex-col gap-4 p-5 transition hover:-translate-y-1 hover:border-accent/40 sm:p-6">
        <header class="flex items-start justify-between gap-3">
            <div>
                <h3 class="font-mono text-xl font-bold text-ink">{{ project.name }}</h3>
                <p class="mt-1 text-ink/80">{{ project.summary }}</p>
            </div>
            <span class="chip shrink-0 whitespace-nowrap">{{ project.period }}</span>
        </header>

        <ul class="space-y-2">
            <li v-for="(item, index) in project.highlights" :key="index" class="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span class="font-mono text-accent select-none" aria-hidden="true">›</span>
                <span>{{ item }}</span>
            </li>
        </ul>

        <div class="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-edge pt-4">
            <div class="flex flex-wrap gap-1.5">
                <span v-for="tech in project.stack" :key="tech" class="chip">{{ tech }}</span>
            </div>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="btn btn-outline py-1.5">
                {{ t('projects_view.card.visit') }}
                <Icon name="external" :size="14" />
            </a>
        </div>
    </article>
</template>
