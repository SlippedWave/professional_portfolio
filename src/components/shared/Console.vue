<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import TypingAnimation from './TypingAnimation.vue';
import Icon from './Icon.vue';

const props = defineProps({
  lines: {
    type: Array,
    required: true,
  },
  // Working directory shown in the prompt and window title
  cwd: {
    type: String,
    default: '~',
  },
  // Faster typing for secondary pages
  fast: {
    type: Boolean,
    default: false,
  },
  // Deliberately slow, dramatic typing (error page)
  slow: {
    type: Boolean,
    default: false,
  },
  popOut: {
    type: Boolean,
    default: true,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  returnMessage: {
    type: Array,
  },
});

const emit = defineEmits(['typing-completed']);

const linesAlreadyStopped = ref(false);

const typing = computed(() => {
  if (props.slow) return { speed: 45, charsPerTick: 1, lineDelay: 400 };
  if (props.fast) return { speed: 10, charsPerTick: 4, lineDelay: 25 };
  return { speed: 14, charsPerTick: 1, lineDelay: 70 };
});

// Python REPL prompts: continuation lines get "... "
const prefixes = computed(() => props.lines.map(line => (/^[\s})\]]/.test(line) ? '... ' : '>>> ')));

const handleTypingCompleted = () => {
  if (props.isError) {
    linesAlreadyStopped.value = true;
    return;
  }
  if (props.popOut) {
    emit('typing-completed');
  }
};
</script>

<template>
  <div class="w-[min(92vw,48rem)] overflow-hidden rounded-xl border border-edge shadow-2xl shadow-black/60">
    <!-- Yaru style header bar -->
    <div class="relative flex h-10 items-center justify-center bg-titlebar px-3">
      <span class="truncate text-sm font-medium text-ink/85">francisco@portfolio: {{ props.cwd }}</span>
      <div class="absolute right-3 flex gap-2" aria-hidden="true">
        <span class="grid size-5 place-items-center rounded-full bg-white/10 text-ink/70"><Icon name="minimize" :size="12" /></span>
        <span class="grid size-5 place-items-center rounded-full bg-white/10 text-ink/70"><Icon name="maximize" :size="10" /></span>
        <span class="grid size-5 place-items-center rounded-full bg-accent text-canvas"><Icon name="close" :size="12" /></span>
      </div>
    </div>

    <div class="h-80 overflow-y-auto bg-panel/95 p-4 font-mono text-[15px] leading-relaxed"
      :class="props.isError ? 'text-danger' : 'text-ink'">
      <p>
        <span class="font-bold text-prompt">francisco@portfolio</span><span class="text-ink">:</span><span
          class="font-bold text-path">{{ props.cwd }}</span><span class="text-ink">$ python3</span>
      </p>
      <TypingAnimation :lines="props.lines" :prefixes="prefixes" :keepCursor="false" v-bind="typing"
        @typing-completed="handleTypingCompleted" />
      <RouterLink v-if="props.isError && linesAlreadyStopped" to="/"
        class="mt-2 block text-path underline underline-offset-4 hover:text-accent">
        <TypingAnimation :lines="props.returnMessage" v-bind="typing" />
      </RouterLink>
    </div>
  </div>
</template>
