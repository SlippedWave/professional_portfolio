<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div ref="consoleContainer">
      <div class="console-container d-flex justify-content-center align-items-center">
        <Console :lines="lines" @typing-completed="handleTypingCompleted" />
      </div>
    </div>
  </main>

  <main v-else class="h-100 d-flex justify-content-center align-items-center">
    <div class="container contact-view">
      <div class="row">
        <div class="d-flex justify-content-center align-items-center">
          <ContactForm />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted } from 'vue';
import { popup } from '@/assets/js/animations.js';
import { useMotion } from '@vueuse/motion';
import ContactForm from '@/components/Contact/ContactForm.vue';

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);

const lines = [
  'contact_info = {',
  '    "Email": "frgonz03@gmail.com",',
  '    "LinkedIn": "linkedin.com/in/frgonz",',
  '    "GitHub": "github.com/SlippedWave"',
  '}',
  'for method, info in contact_info.items():',
  '    print(f"{method}: {info}")',
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

<style scoped></style>