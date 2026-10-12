<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  letterColor: {
    type: String,
    default: 'rgba(254, 128, 25, 0.16)',
  },
});

const canvasRef = ref(null);

const FONT_SIZE = 18;
const FRAME_MS = 70;

let interval = null;
let resizeCanvas = null;
let handleVisibility = null;

onMounted(() => {
  // Static gradient only for users who prefer less motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = canvasRef.value;
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;

  let drops = [];

  resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.ceil(canvas.width / FONT_SIZE);
    drops = Array.from({ length: columns }, () => Math.random() * -canvas.height);
  };

  const draw = () => {
    // Fade previous frame into the canvas color for the trail effect
    ctx.fillStyle = 'rgba(29, 32, 33, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = props.letterColor;
    ctx.font = `${FONT_SIZE}px "Ubuntu Mono", monospace`;

    drops.forEach((y, index) => {
      const text = String.fromCharCode(0x30a0 + Math.random() * 96);
      ctx.fillText(text, index * FONT_SIZE, y);
      drops[index] = y > canvas.height && Math.random() > 0.975 ? 0 : y + FONT_SIZE;
    });
  };

  const start = () => {
    if (!interval) interval = setInterval(draw, FRAME_MS);
  };
  const stop = () => {
    clearInterval(interval);
    interval = null;
  };

  handleVisibility = () => (document.hidden ? stop() : start());

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('visibilitychange', handleVisibility);
  start();
});

onUnmounted(() => {
  clearInterval(interval);
  window.removeEventListener('resize', resizeCanvas);
  document.removeEventListener('visibilitychange', handleVisibility);
});
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
    <canvas ref="canvasRef" class="absolute inset-0 size-full"></canvas>
    <!-- Soft warm glow + vignette over the rain -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(254_128_25/0.1),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgb(250_189_47/0.06),transparent_55%)]">
    </div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55))]"></div>
  </div>
</template>
