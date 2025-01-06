<template>
    <div class="card bg-dark text-white d-flex justify-content-center align-items-center w-100">
        <div class="card-body text-center py-4">
            <h1 class="mb-4">
                <slot name="title"></slot>
            </h1>
            <hr>
            <div>
                <p class="card-text">
                    <slot name="text"></slot>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card {
    border-radius: 15px;
    padding-block: 1vh;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.card-body {
    padding: 1vh;
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
    font-size: 1.1rem;
    line-height: 1.6;
    color: #bbbbbb;
}
</style>