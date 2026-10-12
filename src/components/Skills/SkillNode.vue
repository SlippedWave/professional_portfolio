<template>
    <div class="pointer-events-auto w-[280px] rounded-lg border bg-panel/95 p-3 text-ink shadow-lg shadow-black/40 transition-colors"
        :class="detailsOpen ? 'border-accent' : 'border-edge hover:border-accent/50'">
        <div class="flex items-stretch gap-2">
            <button type="button" class="flex flex-1 cursor-pointer items-center justify-between gap-2 text-left"
                :aria-expanded="detailsOpen" @click="$emit('toggleDetails')">
                <span class="font-mono text-lg font-bold">{{ skillName }}</span>
                <Icon :name="detailsOpen ? 'chevron-down' : 'chevron-right'" :size="16" class="text-ink-muted" />
            </button>
            <button v-if="hasChildren" type="button"
                class="grid cursor-pointer place-items-center rounded-md bg-accent/15 px-2 text-accent transition hover:bg-accent hover:text-canvas"
                aria-label="Expand" @click="$emit('nodeClick')">
                <Icon name="arrow-right" :size="16" />
            </button>
        </div>
        <p v-if="detailsOpen" class="mt-2 border-t border-edge pt-2 text-sm leading-relaxed text-ink/80">
            {{ skillDetails }}
        </p>
    </div>
</template>

<script setup>
import Icon from '@/components/shared/Icon.vue';

// Details state is owned by SkillsMindMap so siblings can be closed together
defineProps({
    hasChildren: Boolean,
    skillName: String,
    skillDetails: String,
    detailsOpen: Boolean,
});

defineEmits(['nodeClick', 'toggleDetails']);
</script>
