<script setup>
import Console from '@/components/shared/Console.vue';
import Icon from '@/components/shared/Icon.vue';
import { ref, onMounted, computed, watch } from 'vue';
import ProjectCard from '@/components/Projects/ProjectCard.vue';
import FeaturedProject from '@/components/Projects/FeaturedProject.vue';
import getJsonFile from '@/assets/js/locale_functions.js';
import { useConsoleIntro } from '@/composables/useConsoleIntro.js';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const { consoleContainer, isConsolePoppedOut, handleTypingCompleted } = useConsoleIntro();

// Curated highlights (local data, per locale) shown above the live GitHub list
const featured = ref([]);
const loadFeatured = async () => {
  featured.value = (await getJsonFile('projects', locale.value)).projects;
};
watch(locale, loadFeatured);

const projects = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

const fetchProjects = async () => {
  const query = `
    query {
        viewer {
            repositories(
                first: 100,
                orderBy: {field: UPDATED_AT, direction: DESC},
                ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
            ) {
                nodes {
                    id
                    name
                    description
                    url
                    openGraphImageUrl
                    homepageUrl
                    isPrivate
                    visibility
                    viewerPermission
                    owner {
                        login
                        avatarUrl
                    }
                    primaryLanguage {
                        name
                        color
                    }
                    languages(first: 10) {
                        nodes {
                            name
                            color
                        }
                    }
                    repositoryTopics(first: 10) {
                        nodes {
                            topic {
                                name
                            }
                        }
                    }
                    stargazerCount
                    forkCount
                    updatedAt
                }
            }
        }
    }`;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v4.idl',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    if (data.errors || !data.data) {
      console.error('GraphQL Errors:', data.errors);
      hasError.value = true;
      return;
    }
    projects.value = data.data.viewer.repositories.nodes;
  } catch (error) {
    console.error('Error fetching projects:', error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const lines = [
  'import pandas as pd',
  'projects = pd.DataFrame({',
  '    "Project": ["Nutriplatanos", "Portfolio", "Beaver Deliver", "DEEMU"],',
  '    "Stack": ["Laravel", "Vue", "Flask", "React"]',
  '})',
  'print(projects)',
];

const uniqueLanguages = computed(() => {
  const languagesMap = new Map();
  projects.value.forEach(project => {
    project.languages.nodes.forEach(lang => {
      if (!languagesMap.has(lang.name)) {
        languagesMap.set(lang.name, lang.color);
      }
    });
  });
  return Array.from(languagesMap, ([name, color]) => ({ name, color })).sort((a, b) => a.name.localeCompare(b.name));
});

const selectedLanguage = ref('all');

const filteredProjectsByLanguage = computed(() => {
  if (selectedLanguage.value === 'all') {
    return projects.value;
  }
  return projects.value.filter(project =>
    project.languages.nodes.some(lang => lang.name === selectedLanguage.value)
  );
});

const filterClass = (active) => (active
  ? 'border-accent bg-accent/15 text-ink'
  : 'border-edge text-ink-muted hover:border-ink-muted/50 hover:text-ink');

onMounted(() => {
  loadFeatured();
  fetchProjects();
});
</script>

<template>
  <div v-if="!isConsolePoppedOut" class="flex flex-1 items-center justify-center">
    <div ref="consoleContainer">
      <Console :lines="lines" cwd="~/projects" fast @typing-completed="handleTypingCompleted" />
    </div>
  </div>

  <div v-else class="flex flex-col gap-8">
    <header>
      <p class="font-mono text-sm text-ink-muted">
        <span class="text-prompt">francisco@portfolio</span>:<span class="text-path">~/projects</span>$ ls
      </p>
      <h1 class="section-title mt-2">{{ t('projects_view.projectsTitle') }}</h1>
      <p class="mt-2 text-lg text-ink-muted">{{ t('projects_view.subtitle') }}</p>
    </header>

    <section v-if="featured.length" class="flex flex-col gap-4">
      <h2 class="font-mono text-sm tracking-widest text-ink-muted uppercase">{{ t('projects_view.featured') }}</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <FeaturedProject v-for="project in featured" :key="project.name" :project="project" />
      </div>
    </section>

    <h2 class="mt-4 font-mono text-sm tracking-widest text-ink-muted uppercase">{{ t('projects_view.more_on_github') }}</h2>

    <!-- Language filters -->
    <div v-if="uniqueLanguages.length" class="flex flex-wrap gap-2">
      <button type="button"
        class="cursor-pointer rounded-full border px-3 py-1 font-mono text-sm transition-colors"
        :class="filterClass(selectedLanguage === 'all')" @click="selectedLanguage = 'all'">
        {{ t('projects_view.filterAll') }}
      </button>
      <button v-for="language in uniqueLanguages" :key="language.name" type="button"
        class="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 font-mono text-sm transition-colors"
        :class="filterClass(selectedLanguage === language.name)" @click="selectedLanguage = language.name">
        <span class="size-2.5 rounded-full" :style="{ backgroundColor: language.color || '#888' }"></span>
        {{ language.name }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" :aria-label="t('projects_view.loading')">
      <div v-for="n in 6" :key="n" class="panel h-80 animate-pulse"></div>
    </div>

    <div v-else-if="hasError" class="panel flex items-center gap-3 p-6 text-danger">
      <Icon name="alert" />
      {{ t('projects_view.error') }}
    </div>

    <div v-else-if="filteredProjectsByLanguage.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="repo in filteredProjectsByLanguage" :key="repo.id" :name="repo.name"
        :description="repo.description" :url="repo.url" :homepage-url="repo.homepageUrl" :is-private="repo.isPrivate"
        :languages="repo.languages.nodes" :image-url="repo.openGraphImageUrl" :visibility="repo.visibility"
        :stars="repo.stargazerCount" />
    </div>

    <div v-else class="flex flex-col items-center gap-3 py-16 text-ink-muted">
      <Icon name="search" :size="48" />
      <p>{{ t('projects_view.noProjects') }}</p>
    </div>
  </div>
</template>
