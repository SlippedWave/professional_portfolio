<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  lines: {
    type: Array,
    required: true,
  },
  // Static text shown before each line (e.g. ">>> "), not typed
  prefixes: {
    type: Array,
    default: () => [],
  },
  keepCursor: {
    type: Boolean,
    default: true,
  },
  // Milliseconds between ticks
  speed: {
    type: Number,
    default: 20,
  },
  // Characters written per tick
  charsPerTick: {
    type: Number,
    default: 1,
  },
  // Pause before starting the next line
  lineDelay: {
    type: Number,
    default: 90,
  },
});

const emit = defineEmits(['typing-completed']);

const displayedLines = ref([]);
const currentLineIndex = ref(0);
const isTyping = ref(true);

let charIndex = 0;
let timer = null;

const finish = () => {
  isTyping.value = false;
  emit('typing-completed');
};

const typeText = () => {
  if (currentLineIndex.value >= props.lines.length) {
    finish();
    return;
  }

  const line = props.lines[currentLineIndex.value];
  if (displayedLines.value.length <= currentLineIndex.value) {
    displayedLines.value.push('');
  }

  if (charIndex < line.length) {
    const next = line.slice(charIndex, charIndex + props.charsPerTick);
    displayedLines.value[currentLineIndex.value] += next;
    charIndex += next.length;
    timer = setTimeout(typeText, props.speed);
  } else {
    currentLineIndex.value++;
    charIndex = 0;
    timer = setTimeout(typeText, props.lineDelay);
  }
};

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayedLines.value = [...props.lines];
    currentLineIndex.value = props.lines.length;
    finish();
    return;
  }
  typeText();
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="font-mono">
    <div v-for="(line, index) in displayedLines" :key="index" class="whitespace-pre-wrap break-words">
      <span v-if="prefixes[index]" class="select-none text-ink-muted">{{ prefixes[index] }}</span>{{ line }}<span
        v-if="index === currentLineIndex || (index === displayedLines.length - 1 && !isTyping && keepCursor)"
        class="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] animate-blink bg-current"></span>
    </div>
  </div>
</template>
