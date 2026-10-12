import { ref, nextTick } from 'vue';
import { useMotion } from '@vueuse/motion';
import { popup } from '@/assets/js/animations.js';

// Shared flow for every view: show the terminal, type it out, then swap in the real content.
export function useConsoleIntro({ duration = 400, onRevealed } = {}) {
  const consoleContainer = ref(null);
  const isConsolePoppedOut = ref(false);

  const motion = useMotion(consoleContainer, popup(duration));

  const handleTypingCompleted = async () => {
    await motion.apply('leave');
    isConsolePoppedOut.value = true;
    await nextTick();
    onRevealed?.();
  };

  return { consoleContainer, isConsolePoppedOut, handleTypingCompleted };
}
