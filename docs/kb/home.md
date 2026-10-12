# Home section (`/`, `views/HomeView.vue`)

## Flow
Console (normal speed, intro duration 600) types `home_view.greetingConsoleLines` (3). Then:
1. `#presentation` — `PresentationCard` hero (fade-visible-once).
2. `#about-me` — 3-col grid (md+) of `IntroductionCard`s with staggered reveal: about.md, hobbies.md, interests.md.

## PresentationCard.vue
Props `name, title, aboutme, text, imageref`. Two-column hero (photo first on mobile):
prompt `$ whoami` → h1 name (4xl–6xl) → title mono accent → "About me" eyebrow + text → CTAs: View projects (`/projects`, primary), Contact me (`/contact`, outline), Download CV (ghost, opens bundled PDF).
Photo: round, accent border, blurred accent glow.

## IntroductionCard.vue
Prop `file` (fake filename in header). Slots `title`, `text`. `.panel` with file-tab header.

## Content keys
`owners_info.*`, `home_view.aboutMeTitle/Text`, `getToKnowMe*`, `hobbies*`, `interests*`, `home_view.cta.projects/contact`, `common.download_cv`.

## Ideas not done yet
Key stats / current role highlight, featured projects strip, tech stack row.
