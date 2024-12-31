<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted, computed } from 'vue';
import { popup } from '@/assets/js/animations.js';
import { useMotion } from '@vueuse/motion';
import ProjectCard from '@/components/Projects/ProjectCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);
const projects = ref([]);

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
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return;
    }
    projects.value = data.data.viewer.repositories.nodes;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};


const lines = [
  'import pandas as pd',
  'projects = pd.DataFrame({',
  '    "Project": ["Project A", "Project B", "Project C"],',
  '    "Description": ["Description A", "Description B", "Description C"]',
  '})',
  'print(projects)',
];

let apply;

const handleTypingCompleted = async () => {

  if (consoleContainer.value) {
    await apply('leave');
  }

  isConsolePoppedOut.value = true;

  await nextTick();

  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    observer.observe(section);
  });

};

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

const selectLanguage = (language) => {
  selectedLanguage.value = language;
};

onMounted(async () => {
  if (consoleContainer.value) {
    ({ apply } = useMotion(consoleContainer.value, popup(1000)));
  }
  await fetchProjects();
});

</script>

<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div class="d-flex justify-content-center align-items-center">
      <Console :lines="lines" @typing-completed="handleTypingCompleted" />
    </div>
  </main>

  <main v-else class="h-100 d-flex justify-content-center align-items-center">
    <div class="container projects-view p-3 m-3">
      <!-- Header Section -->
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="display-4 title mb-3">{{ t('projects_view.projectsTitle') }}</h1>
          <h2 class="lead subtitle bold">{{ t('projects_view.subtitle') }}</h2>
        </div>
      </div>

      <!-- Language Filters Section -->
      <div class="row my-4">
        <div class="col-12">
          <div class="d-flex justify-content-center flex-wrap gap-2">
            <button v-for="language in uniqueLanguages" :key="language.name" class="btn mx-2 p-2 rounded-pill border-0"
              :class="{ active: selectedLanguage === language.name }" @click="selectLanguage(language.name)"
              :style="{ backgroundColor: selectedLanguage === language.name ? language.color : 'transparent', color: selectedLanguage === language.name ? '#fff' : language.color }">
              {{ language.name }}
            </button>
            <button class="btn rounded-pill border-0" :class="{ active: selectedLanguage === 'all' }"
              @click="selectLanguage('all')"
              :style="{ backgroundColor: selectedLanguage === 'all' ? '#6c757d' : 'transparent', color: selectedLanguage === 'all' ? '#fff' : '#6c757d' }">
              All Languages
            </button>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="row g-4">
        <template v-if="filteredProjectsByLanguage.length">
          <div v-for="repo in filteredProjectsByLanguage" :key="repo.id" class="col-12 col-md-6 col-lg-4">
            <ProjectCard :name="repo.name" :description="repo.description" :url="repo.url"
              :homepage-url="repo.homepageUrl" :is-private="repo.isPrivate" :languages="repo.languages.nodes"
              :image-url="repo.openGraphImageUrl" :visibility="repo.visibility" />
          </div>
        </template>
        <div v-else class="col-12 text-center py-5">
          <div class="text-muted">
            <i class="bi bi-search display-1"></i>
            <p class="mt-3">{{ t('projects_view.noProjects') }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title {
  font-weight: bold;
  color: rgb(210, 220, 233);
}



.subtitle {
  color: rgb(157, 174, 194);
  font-size: 1.5rem;
}

.projects-view {
  padding: 2rem 0;
}
</style>