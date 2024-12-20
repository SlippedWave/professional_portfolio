<script setup>
import TypingAnimation from '../components/TypingAnimation.vue';
import { RouterLink } from 'vue-router';
import { defineProps, ref, defineEmits } from 'vue';

const linesAlreadyStopped = ref(false);

const props = defineProps({
  lines: {
    type: Array,
    required: true,
  },
  popOut: {
    type: Boolean,
    default: true,
  },
  letterColor: {
    type: String,
    default: '#FFFFFF',
  },
  isError: {
    type: Boolean,
    default: false,
  },
  returnMessage: {
    type: Array,
  }
});

const emit = defineEmits(['typing-completed']);

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
  <main class="console">
    <div class="terminal bg-dark text-light rounded">
      <div class="terminal-header d-flex p-2">
        <div class="terminal-buttons">
          <span class="button close"></span>
          <span class="button minimize"></span>
          <span class="button maximize"></span>
        </div>
        <div class="terminal-title">Terminal</div>
      </div>
      <div class="terminal-body p-3" :style="{ color: props.letterColor }">
        <TypingAnimation :lines="props.lines" :keepCursor="false" @typing-completed="handleTypingCompleted" />
        <RouterLink class="redirect-link" v-if="props.isError && linesAlreadyStopped" to="/">
          <TypingAnimation :lines="props.returnMessage" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.console {
  width: 90vw;
  max-width: 50rem;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
}

.terminal {
  height: 20rem;
  box-shadow: 0 0 15px rgba(60, 61, 60, 0.59);
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.close {
  background-color: #ff5f56;
}

.minimize {
  background-color: #ffbd2e;
}

.maximize {
  background-color: #27c93f;
}

.terminal-title {
  color: #fff;
  font-size: 1.25rem;
  margin-left: 1.25rem;
  flex-grow: 1;
}

.terminal-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  font-family: 'Courier New', monospace;
}
</style>