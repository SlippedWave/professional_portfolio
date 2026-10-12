<script setup>
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Icon from '@/components/shared/Icon.vue';
import cvUrl from '@/assets/docs/resumeFranciscoJavierGonzalez.pdf';

const { t } = useI18n();

defineProps({
    name: {
        type: String,
        required: true,
    },
    aboutme: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    imageref: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div class="order-2 md:order-1">
            <p class="font-mono text-sm text-ink-muted">
                <span class="text-prompt">francisco@portfolio</span>:<span class="text-path">~</span>$ whoami
            </p>
            <h1 class="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">{{ name }}</h1>
            <p class="mt-3 font-mono text-lg text-accent sm:text-xl">{{ title }}</p>

            <h2 class="mt-8 text-sm font-medium tracking-widest text-ink-muted uppercase">{{ aboutme }}</h2>
            <p class="mt-2 max-w-2xl text-lg leading-relaxed text-ink/85">{{ text }}</p>

            <div class="mt-8 flex flex-wrap gap-3">
                <RouterLink to="/projects" class="btn btn-primary">
                    {{ t('home_view.cta.projects') }}
                    <Icon name="arrow-right" :size="16" />
                </RouterLink>
                <RouterLink to="/contact" class="btn btn-outline">{{ t('home_view.cta.contact') }}</RouterLink>
                <a :href="cvUrl" target="_blank" rel="noopener" class="btn btn-ghost">
                    <Icon name="download" :size="16" />
                    {{ t('common.download_cv') }}
                </a>
            </div>
        </div>

        <div class="order-1 mx-auto md:order-2">
            <div class="relative">
                <div class="absolute -inset-3 rounded-full bg-accent/25 blur-2xl" aria-hidden="true"></div>
                <img :src="imageref" :alt="name"
                    class="relative size-40 rounded-full border-2 border-accent/70 object-cover sm:size-56 lg:size-64" />
            </div>
        </div>
    </div>
</template>
