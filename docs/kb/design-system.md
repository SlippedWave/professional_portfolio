# Design system — softened terminal, Gruvbox Dark

Source of truth: `src/assets/styles/main.css` (Tailwind v4 `@theme`). Use tokens via utilities (`bg-panel`, `text-accent/70`, ...). No hex in components (exceptions: d3 stroke in SkillsMindMap, canvas colors in MatrixBackground/App letterColor, gradient arbitrary values — keep them in sync with tokens).
Palette chosen by user 2026-10-12 (Gruvbox Dark, github.com/morhetz/gruvbox) replacing aubergine + Ubuntu orange.

## Color tokens
| Token | Value | Use |
|---|---|---|
| `canvas` | `#1d2021` | page background (bg0_h), matrix trail fill, text on accent |
| `panel` | `#282828` | cards (`.panel` = `bg-panel/85` + blur), terminal body |
| `panel-2` | `#3c3836` | raised surface, image placeholders, active HUD tab |
| `raised` | `#504945` | second powerline segment |
| `chrome` | `#151718` | header/footer glass |
| `titlebar` | `#32302f` | terminal window title bar |
| `edge` | cream 10% | all borders |
| `ink` / `ink-muted` | `#ebdbb2` / `#a89984` | text |
| `accent` | `#fe8019` | orange: primary buttons (dark `text-canvas` + bold), active nav, timeline dots, mind map links |
| `alt` / `warn` | `#fabd2f` | yellow: hairline gradient end, private badge |
| `prompt` | `#b8bb26` | `user@host` in prompts, success |
| `path` | `#83a598` | cwd in prompts, links in terminal |
| `danger` | `#fb4934` | errors, red rain on error page |

## Type
- `font-sans` Ubuntu Sans (UI, body). `font-mono` Ubuntu Mono (prompts, nav, titles `.section-title`, chips, code).
- Loaded in `index.html` from Google Fonts.

## Component classes (main.css `@layer components`)
`.panel`, `.btn` + `.btn-primary | .btn-outline | .btn-ghost`, `.chip`, `.field` (inputs), `.section-title`.

## Recurring motifs
- Prompt header above every section: `<span text-prompt>francisco@portfolio</span>:<span text-path>~/x</span>$ cmd`.
- File-tab headers on cards (`~/about.md`).
- Terminal window (`Console.vue`): Yaru title bar centered title, round minimize/maximize/close on right (close = accent).

## Motion
- Intro: `useConsoleIntro` + `popup(duration)` preset (`animations.js`).
- Reveal: `v-motion` with `:initial` / `:visible-once` (Home cards, timeline items staggered).
- Hover: `hover:-translate-y-1 hover:border-accent/40` on cards.
- Background: `MatrixBackground` katakana rain 70ms/frame, faint orange, pauses when tab hidden, off for reduced motion; radial aubergine glow + vignette overlay.
- Global `prefers-reduced-motion` kill switch in main.css; TypingAnimation shows text instantly.

## Icons
`components/shared/Icon.vue` — inline Lucide-style paths: download, search, chevron-right, chevron-down, arrow-right, external, mail, menu, close, minimize, maximize, star, check, alert. Add new paths there.
