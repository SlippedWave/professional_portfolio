<template>
    <div class="card bg-dark text-white d-flex justify-content-center align-items-center w-100">
        <div class="card-body text-center py-4">
            <img :src="imageSrc" alt="profile_photo" class="profile-img rounded-circle">
            <h1 class="mb-1">{{ name }}</h1>
            <p class="lead mb-4">{{ title }}</p>
            <h5 class="mb-3">{{ aboutme }}</h5>
            <div class="about-me-text">
                <p class="card-text">{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'; // Import `computed` from Vue

// Define props using `defineProps`
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    aboutme: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    imageref: {
        type: String,
        required: true,
    },
});

// Define the computed property for the image source
const imageSrc = computed(() => {
    return new URL(props.imageref, import.meta.url).href;
});
</script>

<style scoped>
.card {
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.about-me-text {
    max-width: 800px;
    font-size: 1rem;
}

.card-body {
    padding: 2vh;
}

.profile-img {
    width: 20vw;
    height: 20vw;
    margin-block-end: 3vh;
    max-width: 200px;
    max-height: 200px;
    min-width: 90px;
    min-height: 90px;
    object-fit: cover;
    border: 3px solid #fff;
}

h1 {
    font-size: 1.8rem;
    font-weight: bold;
}

h5 {
    font-size: 1.4rem;
}

.lead {
    font-size: 1.3rem;
    font-style: italic;
    color: #cccccc;
}

.card-text {
    font-size: 1rem;
    line-height: 1.6;
    color: #bbbbbb;
}
</style>