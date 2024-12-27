<template>
    <div class="project-card">
        <div class="project-image">
            <img :src="imageUrl" :alt="name" class="img-fluid" @error="$event.target.src = '/default-project.png'" />
        </div>
        <div class="project-content">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="project-title mb-0">{{ name }}</h3>
                <span v-if="isPrivate" class="badge bg-warning text-dark">Private</span>
            </div>
            <p class="project-description">{{ description }}</p>

            <div class="project-languages">
                <span v-for="lang in languages" :key="lang.name" class="language-tag"
                    :style="{ backgroundColor: `${lang.color}20`, color: lang.color }">
                    {{ lang.name }}
                </span>
            </div>

            <div class="d-flex justify-content-center align-items-center">
                <div class="btn-group bg-dark p-1">
                    <a v-if="url" :href="url" target="_blank" class="btn btn_des">
                        {{ t('projects_view.card.open_repo') }}
                    </a>
                    <a v-if="homepageUrl" :href="homepageUrl" target="_blank" class="btn btn_des">
                        {{ t('projects_view.card.open_demo') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
    name: String,
    description: String,
    url: String,
    homepageUrl: String,
    isPrivate: Boolean,
    languages: Array,
    imageUrl: String,
    visibility: String
});
</script>

<style scoped>
.project-card {
    background: rgba(74, 144, 226, 0.05);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(74, 144, 226, 0.1);
    transition: transform 0.3s ease;
    color: rgb(135, 161, 194) !important;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}

.language-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    display: inline-block;
}

.btn-group .btn {
    border-radius: 5px;
}

.btn_des {
    font-weight: bold;
    background: none;
    color: rgb(145, 145, 145);
    border: none;
}

.btn_des:hover {
    color: white;
}

.project-languages {
    margin: 1rem 0;
}
</style>