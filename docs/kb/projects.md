# Projects section (`/projects`, `views/ProjectsView.vue`)

## Data source
- Live GitHub GraphQL from the browser with `VITE_GITHUB_PERSONAL_ACCESS_TOKEN`: `viewer.repositories(first:100, UPDATED_AT DESC, OWNER|COLLABORATOR|ORGANIZATION_MEMBER)`.
- Fields used: id, name, description, url, openGraphImageUrl, homepageUrl, isPrivate, visibility, languages(10), stargazerCount. Fetched but unused: topics, forks, updatedAt, owner, primaryLanguage.
- **Security**: token ends up in the public bundle. Needs proxy / build-time fetch. Private repos are listed.
- States: `isLoading` (6 pulsing skeleton panels), `hasError` (danger panel, `projects_view.error`), empty (`noProjects` + search icon). Without `.env` locally the API returns 401 → error state.

## Layout
Prompt `$ ls` + title/subtitle → language filter pills (All first, color dot, active = accent border/bg) → grid 1/2/3 cols.

## ProjectCard.vue
Props `name, description, url, homepageUrl, isPrivate, languages, imageUrl, visibility, stars`.
`.panel` card: 2:1 OG image (lazy, zoom on hover; fallback gradient tile with initial) → mono name, stars, Private chip (warn) → description (3-line clamp) → language chips → Repo (outline) / Demo (primary + external icon).

## Ideas not done yet
Curated featured list instead of all 100 repos; topics/updated date; hide private repos.
