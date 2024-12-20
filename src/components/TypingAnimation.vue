<template>
  <div class="typing-animation">
    <div v-for="(line, index) in displayedLines" :key="index" class="line">
      {{ line }}<span
        v-if="index === currentLineIndex || (index === displayedLines.length - 1 && !isTyping && keepCursor)"
        class="cursor"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Array,
      required: true,
    },
    keepCursor: {
      type: Boolean,
      default: true,
    },
    writting_speed: {
      type: Number,
      default: 20,
    },
    change_cursor_speed: {
      type: Number,
      default: 90,
    },
  },
  data() {
    return {
      displayedLines: [],
      currentLineIndex: 0,
      currentCharIndex: 0,
      isTyping: true,
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.currentLineIndex < this.lines.length) {
        const currentLine = this.lines[this.currentLineIndex];
        if (this.currentCharIndex < currentLine.length) {
          if (!this.displayedLines[this.currentLineIndex]) {
            this.displayedLines.push('');
          }
          this.displayedLines[this.currentLineIndex] += currentLine[this.currentCharIndex];
          this.currentCharIndex++;
          setTimeout(this.typeText, this.writting_speed);
        } else {
          this.currentLineIndex++;
          this.currentCharIndex = 0;
          setTimeout(this.typeText, this.change_cursor_speed);
        }
      } else {
        this.isTyping = false;
        this.$emit('typing-completed'); // Emit event when typing is completed
      }
    },
  },
};
</script>

<style scoped>
.typing-animation {
  font-family: "Courier New", monospace;
}

.line {
  white-space: nowrap;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 20px;
  background-color: white;
  animation: blink 0.6s step-start infinite;
}

@keyframes blink {
  50% {
    background-color: transparent;
  }
}
</style>