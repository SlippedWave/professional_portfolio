# Experience section (`/experience`, `views/ExperienceView.vue`)

## Data
- `src/assets/data/job_experience/job_experience_{en,es,de}.json`, `education_experience/...`
- Shape: `{ experiences: [{ title, period: "M/YYYY - M/YYYY", company, position, activities[], technologies[] }] }` (`title` unused in UI).
- Jobs (en): HR Analyst @ HCL Technologies (9/2022-1/2023), Web Developer @ Freelance (1/2023-10/2024), Software Developer @ Freelance (10/2024-03/2025), Software Developer @ HPT Center and Planning (03/2025-06/2025).
- Education (en): Software Development Technician @ CETI Colomos (2018-2022), B.Sc. Computer Engineering @ Universidad de Guadalajara (8/2022-6/2026).
- Period format must stay `M/YYYY - ...` — TimeLine sorts by parsing start month/year.

## Layout
Prompt `$ cat history.log` + h1 (`experience_view.job|education`) on the left; segmented tabs (`experience_view.tabs.*`) + Download CV outline button on the right. Page scrolls normally (no inner scroll box).

## TimeLine.vue
`<ol>` inside a wrapper with an absolute dashed rail (`repeating-linear-gradient`) masked to fade out over 2.5rem at both ends (user request); each item has dot (latest = filled accent + glow) and staggered slide-in. Sorted newest first by `startKey(period)`.

## TimeLineCard.vue
`.panel`: position (bold) + company (accent) + period chip → activities with `›` markers → technology chips.

## Ideas not done yet
"Present" flag for current role, duration calc, company logos/locations. Console lines are generic placeholders ("Company A").
