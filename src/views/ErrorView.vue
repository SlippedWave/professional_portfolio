<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Console from '@/components/shared/Console.vue';

const { t, locale } = useI18n();

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

// Bumped on locale change to retype the console
const consoleKey = ref(0);

const lines = computed(() => {
  const errorType = props.code === "404" ? 'notFoundErrorConsoleLines' :
    props.code === "500" ? 'serverErrorConsoleLines' :
      'unknownErrorConsoleLines';

  return [0, 1].map(i => t(`errors_view.${errorType}.${i}`));
});

watch(locale, () => {
  consoleKey.value += 1;
});
</script>

<template>
  <div class="flex flex-1 items-center justify-center">
    <div :key="consoleKey" v-motion-pop>
      <Console :lines="lines" cwd="~/error" slow :popOut="false" :isError="true"
        :returnMessage="[t('error_message_recomendations.clickToRedirectHome')]" />
    </div>
  </div>
</template>
