<template>
    <div class="card bg-dark text-white d-flex justify-content-center align-items-center w-100">
        <div class="card-body text-center py-5">
            <h1 class="mb-4">{{ title }}</h1>
            <hr>
            <div class="about-me-text">
                <p class="card-text">{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});

</script>

<style scoped>
.card {
    border-radius: 15px;
    padding-block: 1vh;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.about-me-text {
    max-width: 700px;
    font-size: 1.2rem;
}

.card-body {
    padding: 3vh;
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
    font-size: 1.2rem;
    line-height: 1.6;
    color: #bbbbbb;
}
</style>