<template>
    <div class="card border-0 shadow-sm text-white" :class="{ 'odd-card': !isOdd, 'even-card': isOdd }" ref="cardRef">
        <div class="card-header bg-primary bg-opacity-25 border-0">
            <h5 class="card-title mb-0">{{ experience.company }}</h5>
            <small class="text-white-50">{{ experience.period }}</small>
        </div>

        <div class="card-body d-flex flex-column">
            <h6 class="fw-bold mb-3">{{ experience.position }}</h6>

            <ul class="list ">
                <li v-for="(activity, actIndex) in experience.activities" :key="actIndex"
                    class="mb-2 d-flex align-items-start">
                    <span>{{ activity }}</span>
                </li>
            </ul>

            <div class="container">
                <div
                    class="mt-2 pt-3 justify-content-center align-items-center border-top border-white border-opacity-25 row">
                    <span v-for="(tech, techIndex) in experience.technologies" :key="techIndex"
                        class="badge col-6 col-md-4 bg-primary bg-opacity-25 me-2 mb-2 text-wrap">
                        {{ tech }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    experience: {
        type: Object,
        required: true
    },
    isOdd: {
        type: Boolean,
        required: true
    }
});

</script>

<style scoped>
.card {
    max-width: 500px;
    border-radius: 8px;
    border: 2px solid rgba(74, 144, 226, 0.5);
    background: rgba(74, 144, 226, 0.15);
    backdrop-filter: blur(5px);
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
}

.odd-card:before {
    content: "";
    position: absolute;
    top: 20px;
    right: -55px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    z-index: 10;
    background: #272e48;
    border: 2px #4b546f;
}

.even-card:before {
    content: "";
    position: absolute;
    top: 20px;
    left: -55px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    z-index: 10;
    background: #272e48;
    border: 2px #4b546f;
}


.badge {
    color: rgb(179, 200, 240) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: opacity 0.2s ease;
    cursor: default;
}

.badge:hover {
    opacity: 0.8;
    user-select: none;
}

.text-primary,
.text-muted,
.card-title,
.card-text {
    color: rgb(179, 200, 240) !important;
}

@media (max-width: 768px) {

    .odd-card:before,
    .even-card:before {
        display: none;
    }
}
</style>