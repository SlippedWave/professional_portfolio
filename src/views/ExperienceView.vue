<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted } from 'vue';
import { popup } from '@/assets/js/animations';
import { useMotion } from '@vueuse/motion';

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);

const lines = [
  'experience = {',
  '    "Company A": "Role - Duration",',
  '    "Company B": "Role - Duration",',
  '    "Company C": "Role - Duration"',
  '}',
  'for company, details in experience.items():',
  '    print(f"{company}: {details}")',
];

let apply;

const handleTypingCompleted = async () => {

  if (consoleContainer.value) {
    await apply('leave');
  }

  isConsolePoppedOut.value = true;

  await nextTick();

  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    observer.observe(section);
  });

};

onMounted(() => {
  if (consoleContainer.value) {
    ({ apply } = useMotion(consoleContainer.value, popup(1000)));
  }
});

</script>

<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div ref="consoleContainer">
      <div class="console-container d-flex justify-content-center align-items-center">
        <Console :lines="lines" @typing-completed="handleTypingCompleted" />
      </div>
    </div>
  </main>


</template>

<style scoped></style>