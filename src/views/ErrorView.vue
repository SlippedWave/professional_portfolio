<script setup>
import { ref, computed, onMounted, defineProps, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Console from '@/components/shared/Console.vue';
import { popup } from '@/assets/js/animations';
import { useMotion } from '@vueuse/motion';

const { t, locale } = useI18n();

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const consoleContainer = ref(0);

// Make lines reactive using computed
const lines = computed(() => {
  const errorType = props.code === "404" ? 'notFoundErrorConsoleLines' :
    props.code === "500" ? 'serverErrorConsoleLines' :
      'unknownErrorConsoleLines';

  return [0, 1].map(i => t(`errors_view.${errorType}.${i}`));
});

onMounted(() => {
  if (consoleContainer.value) {
    useMotion(consoleContainer.value, popup(1000));
  }
});

watch(locale, () => {
  consoleContainer.value += 1;
});
</script>

<template>
  <main class="h-100 d-flex justify-content-center align-items-center">
    <div :key="consoleContainer">
      <div class="console-container d-flex justify-content-center align-items-center">
        <Console :lines="lines" :popOut="false" letterColor="rgb(255,0,0)" :isError="true"
          :returnMessage="[t('error_message_recomendations.clickToRedirectHome')]" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
