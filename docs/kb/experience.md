# Experience section (`/experience`, `views/ExperienceView.vue`)

## Data
- `src/assets/data/job_experience/job_experience_{en,es,de}.json`, `education_experience/...`
- Shape: `{ experiences: [{ title, period, company, position, location, current, activities[], technologies[] }] }` (`title` unused in UI).
- Content mirrors `docs/kb/francisco_persona.md`. Jobs: Intel AI Engineering Intern (6/2026 - Present, current), ELI Schools / Work & Study Travel LATAM contract, Orion 2.0 CRM (2026 - Present, current; month unknown), HPT Full Stack (3/2025 - 6/2025), ITEKNIA Equipamiento Software Developer (1/2023 - 3/2025), HCL HR Analyst (9/2022 - 1/2023).
- Education: UdeG CUCEI B.Sc. (8/2022 - 12/2026 expected, current), University of Cologne exchange (10/2025 - 3/2026), CETI Colomos diploma (8/2018 - 6/2022). Activities beyond persona (ML research, ICPC, Cologne ML/GNNs, DEEMU at CETI) kept from earlier user-authored data.
- "Present" localized in data (Present / Actualidad / Heute).
- Period format `M/YYYY - ...` or `YYYY - ...` (year-only = January) — TimeLine sorts by start.

## Layout
Prompt `$ cat history.log` + h1 (`experience_view.job|education`) on the left; segmented tabs (`experience_view.tabs.*`) + Download CV outline button on the right. Page scrolls normally (no inner scroll box).

## TimeLine.vue
`<ol>` inside a wrapper with an absolute dashed rail (`repeating-linear-gradient`) masked to fade out over 2.5rem at both ends (user request); each item has dot (`current: true` = filled accent + glow; card period chip turns accent) and staggered slide-in. Sorted newest first by `startKey(period)`.

## TimeLineCard.vue
`.panel`: position (bold) + company (accent) + location (muted) + period chip → activities with `›` markers → technology chips.

## Ideas not done yet
Duration calc, company logos.
