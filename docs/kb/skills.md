# Skills section (`/skills`, `views/SkillsView.vue`)

## Data
`src/assets/data/skills/skills_{en,es,de}.json` — tree `{ name, description, children? }`. Root "Skills" → categories (Programming Languages, Technologies, Web Development, Soft Skills, Languages, Tools and Methodologies) → subgroups → leaves. No levels/years/icons.
Descriptions are first person and tied to real experience from `job_experience`/`education_experience` (HCL macros, freelance CRM/inventory + Flask/Vue, HPT Laravel/ERP/Docker/Git, CETI crypto landing/forum/DEX, UdeG ML research + ICPC + project leadership, Cologne exchange ML/GNNs). User asked for this personal tone in all 3 locales; never invent projects. Still generic (no evidence in data, ask user for specifics): C#, LaTeX, ClickUp, React.js/React, MSSQL (both nodes).

## Layout
Prompt `$ tree` + title `skills_view.title` + hint `skills_view.hint` → `.panel` 70vh (min 420px) holding `SkillsMindMap` (`:key` bumped on locale change).

## SkillsMindMap.vue
- D3 horizontal tree, viewBox = container size. Constants: `NODE_LEFT -100`, `NODE_RIGHT 180`, `NODE_HALF_HEIGHT 26`, `NODE_SPACING 110`, `LEVEL_SPACING 380`.
- Initial zoom fits tree in panel via `zoom.transform` (zoom owns translate, so panning doesn't jump). `scaleExtent [0.3, 2]`.
- Transitions follow Bostock's collapsible tree (observablehq.com/@d3/collapsible-tree): one shared 500ms `easeCubicInOut` transition for nodes + links; entering nodes/links grow from the clicked node's previous position with opacity 0 to 1; exiting ones fold into their nearest still-visible ancestor (`visibleAncestor`) and fade. Links in `gLink` layer under `gNode`. Duration 0 with reduced motion.
- Camera (Schmuecker pattern): on expand, `focusNode` pans/zooms (named transition "camera") so clicked node sits at 25% width and its children fit vertically (k clamped 0.45-1).
- Accordion: expanding a node collapses its expanded siblings.
- Description text state lives in mind map (`openDetails` reactive Set of node ids), rendered through `SkillNodeHost` wrapper so nodes re-render. User rule: only one sibling text open at a time; toggling a branch (expand or collapse) closes sibling text; hidden nodes drop their open state.
- Open text reflows layout: `separation` adds `detailsHeight(upperOf(a, b))` (estimate ~36 chars/20px line) so lower siblings slide down instead of being covered. d3 passes `separation(current, previousSibling)`, so `upperOf` resolves order via sibling index.
- Nodes: `foreignObject` (pointer-events none, overflow visible) with Vue `SkillNode` mounted by `render()`; unmounted on exit end and in `clearMindMap()`. Clicked node `raise()`d so expanded details sit on top.
- Links: horizontal cubic from card right edge (`NODE_RIGHT`) to card left edge (`NODE_LEFT`), `rgba(233,84,32,0.55)`, width `8/depth`.
- Resize: debounced 200ms redraw; listener removed on unmount.
- Scoped `<style>` rules don't apply to D3-created elements (no scope attribute); style via d3 attrs or Tailwind classes in SkillNode.

## SkillNode.vue
280px card, controlled: props `detailsOpen`; emits `toggleDetails` (name/chevron button) and `nodeClick` (accent arrow, expands children).

## Ideas not done yet
Mobile-friendly alternative (category chip grid / accordion) — graph is pan/zoom only on phones.
