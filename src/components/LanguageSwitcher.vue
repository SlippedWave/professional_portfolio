<template>
    <div class="language-switcher">
        <img src="@/assets/icons/american-flag.svg" alt="English" @click="setLanguage('en')" class="flag-icon"
            :class="{ selected: selectedLanguage === 'en' }" />
        <img src="@/assets/icons/mexican-flag.svg" alt="Español" @click="setLanguage('es')" class="flag-icon"
            :class="{ selected: selectedLanguage === 'es' }" />
        <img src="@/assets/icons/german-flag.svg" alt="Deutsch" @click="setLanguage('de')" class="flag-icon"
            :class="{ selected: selectedLanguage === 'de' }" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const setLanguage = (lang) => {
    selectedLanguage.value = lang;
    locale.value = lang;
};
</script>

<style scoped>
.language-switcher {
    bottom: 15px;
    right: 15px;
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    background: rgb(34, 34, 34);
    border-radius: 10px;
    z-index: 1000;
    user-select: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.flag-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.2s ease;
    border-radius: 50%;
    object-fit: cover;
}

.flag-icon:hover {
    transform: scale(1.2);
}

.flag-icon.selected {
    border: 2px solid #007bff;
}
</style>