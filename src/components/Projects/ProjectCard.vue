<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from '@/components/shared/Icon.vue';

const { t } = useI18n();

defineProps({
    name: String,
    description: String,
    url: String,
    homepageUrl: String,
    isPrivate: Boolean,
    languages: Array,
    imageUrl: String,
    visibility: String,
    stars: Number
});

const imageFailed = ref(false);
</script>

<template>
    <article
        class="panel group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-accent/40">
        <div class="relative aspect-[2/1] overflow-hidden border-b border-edge bg-panel-2">
            <img v-if="imageUrl && !imageFailed" :src="imageUrl" :alt="name" loading="lazy"
                class="size-full object-cover transition duration-500 group-hover:scale-105"
                @error="imageFailed = true" />
            <div v-else
                class="grid size-full place-items-center bg-[linear-gradient(135deg,var(--color-panel-2),var(--color-canvas))] font-mono text-4xl font-bold text-accent/70">
                {{ name?.charAt(0).toUpperCase() }}
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-5">
            <div class="flex items-start justify-between gap-2">
                <h3 class="font-mono text-lg font-bold break-all text-ink">{{ name }}</h3>
                <div class="flex shrink-0 items-center gap-2">
                    <span v-if="stars" class="inline-flex items-center gap-1 text-xs text-ink-muted">
                        <Icon name="star" :size="14" />{{ stars }}
                    </span>
                    <span v-if="isPrivate" class="chip border-warn/40 text-warn">{{ t('projects_view.card.private') }}</span>
                </div>
            </div>

            <p v-if="description" class="line-clamp-3 text-sm leading-relaxed text-ink/75">{{ description }}</p>

            <div class="flex flex-wrap gap-1.5">
                <span v-for="lang in languages" :key="lang.name" class="chip gap-1.5">
                    <span class="size-2 rounded-full" :style="{ backgroundColor: lang.color || '#888' }"></span>
                    {{ lang.name }}
                </span>
            </div>

            <div class="mt-auto flex gap-2 pt-2">
                <a v-if="url" :href="url" target="_blank" rel="noopener" class="btn btn-outline flex-1 py-1.5">
                    {{ t('projects_view.card.open_repo') }}
                </a>
                <a v-if="homepageUrl" :href="homepageUrl" target="_blank" rel="noopener"
                    class="btn btn-primary flex-1 py-1.5">
                    {{ t('projects_view.card.open_demo') }}
                    <Icon name="external" :size="14" />
                </a>
            </div>
        </div>
    </article>
</template>
