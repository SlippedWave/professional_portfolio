<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

import Console from '@/components/shared/Console.vue';
import { popup } from '@/assets/js/animations';
import { useMotion } from '@vueuse/motion';

const { t } = useI18n();

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const consoleContainer = ref(null);

const lines = [];

const error_console_line_source = (props.code === "404") ? 'notFoundErrorConsoleLines' : (props.code === "500") ? 'serverErrorConsoleLines' : 'unknownErrorConsoleLines';

for (let i = 0; i < 2; i++) {
  lines.push(t(`${error_console_line_source}.${i}`));
}

onMounted(() => {
  if (consoleContainer.value) {
    useMotion(consoleContainer.value, popup(1000));
  }
});
</script>

<template>
  <main class="h-100 d-flex justify-content-center align-items-center">
    <div ref="consoleContainer">
      <div class="console-container d-flex justify-content-center align-items-center">
        <Console :lines="lines" :popOut="false" letterColor="rgb(255,0,0)" :isError="true"
          :returnMessage="[t('clickToRedirectHome')]" />
      </div>
    </div>
  </main>


</template>

<style scoped></style>
