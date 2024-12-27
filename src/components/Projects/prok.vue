<template>
    <div class="container">
        <div v-for="repo in projects" :key="repo.id" class="projects-container">
            <div class="header">
                <img :src=repo.openGraphImageUrl alt="thumbnail" class="src" />
            </div>
            <div class="title">
                <strong>{{ repo.name }}</strong>
            </div>
            <div class="description">
                {{ repo.description }}
            </div>
            <div class="links">
                <a :href="`https://github.com/${username}/${repo.name}`" target="_blank">Github Repo</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = 'SlippedWave' // Replace with your GitHub username
const projects = ref([])

onMounted(async () => {
    try {
        const response = await fetch('https://api.github.com/user/repos', {
            method: 'GET',
            headers: {
                'Authorization': `token ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`
            }
        });

        console.log(import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN);

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        // Only show repos that have at least one star
        // projects.value = data.filter(repo => repo.stargazers_count !== 0)
        console.log(data)
        projects.value = data;
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped>
.projects-container {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.header img {
    width: 100%;
    max-width: 200px;
}
</style>