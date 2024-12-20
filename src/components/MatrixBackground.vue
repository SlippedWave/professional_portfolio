<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  letterColor: {
    type: String,
    default: 'rgba(42, 24, 110, 0.4)', // Default color
  },
});

const canvasRef = ref(null);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get 2D context');
    return;
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const letters = Array(256).join(1).split('');
  const fontSize = 30;

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = props.letterColor; // Use the prop for the letter color
    ctx.font = `${fontSize}px monospace`;

    letters.forEach((y, index) => {
      const text = String.fromCharCode(3e4 + Math.random() * 33);
      const x = index * fontSize;
      ctx.fillText(text, x, y);
      letters[index] = y > canvas.height + Math.random() * 1e4 ? 0 : y + fontSize;
    });
  };

  const interval = setInterval(draw, 33);

  onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener('resize', resizeCanvas);
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="matrix-canvas"></canvas>
</template>

<style scoped>
.matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Ensure it is behind other content */
}
</style>