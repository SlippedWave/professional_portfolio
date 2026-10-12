<script setup>
defineProps({
    // Fake filename shown in the card header
    file: {
        type: String,
        default: 'README.md',
    },
});
</script>

<template>
    <article class="panel h-full overflow-hidden transition hover:-translate-y-1 hover:border-accent/40">
        <div class="flex items-center gap-2 border-b border-edge bg-black/20 px-4 py-2 font-mono text-xs text-ink-muted">
            <span class="text-path">~/</span>{{ file }}
        </div>
        <div class="p-5">
            <h3 class="text-xl font-bold text-ink">
                <slot name="title"></slot>
            </h3>
            <p class="mt-3 leading-relaxed text-ink/80">
                <slot name="text"></slot>
            </p>
        </div>
    </article>
</template>
