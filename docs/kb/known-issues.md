# Known issues / tech debt

## Security (open)
- GitHub PAT (`VITE_GITHUB_PERSONAL_ACCESS_TOKEN`) is bundled into client JS. Rotate + move behind proxy or build-time fetch.
- Turnstile token never sent to backend → CAPTCHA not enforced server-side.

## Open
- Email still in git history (old ContactView commits) and likely inside the CV PDF; robots.txt is advisory only (bad bots ignore it).
- `components/__tests__/HelloWorld.spec.js` imports nonexistent `HelloWorld.vue` → test suite fails.
- `.eslintrc.js` legacy CommonJS config; ESLint 10 + `"type": "module"` need flat `eslint.config.js`.
- `motion` package installed, unused. `animations.js` `scale_hover` unused.
- Mind map is hard to use on phones.
- `src/assets/docs/a.html` empty untracked file. README is default Vite template.
- `fiverr-icon.svg`/`mexican-flag.svg` large (mexican flag 140KB) — could optimize.

## Fixed in Ubuntu redesign (2026-10-12)
- Bootstrap removed (CSS 340KB → 36KB); Bootstrap Icons replaced by `Icon.vue`.
- `observer` ReferenceError in Contact/Experience/Projects/Skills (shared `useConsoleIntro`).
- Popup motion missing on Projects/Error.
- Mind map resize-listener leak, unmounted vnode leak, tiny render (2000px viewBox), pan jump, overlapping foreignObjects blocking clicks.
- TypingAnimation timers not cleared; Matrix never paused, no reduced-motion.
- Experience: re-render on resize, fragile date sort, hardcoded English buttons.
- Contact: errors shown before typing, literal `{{ }}` sitekey attr, Turnstile script re-injected, `alert()` feedback, contact details only in console.
- Missing `/default-project.png`; Private badge not translated; footer year hardcoded; locale not persisted; `<html lang>` empty; Roboto loaded but unused.
- Unused `SkillsTable.vue` deleted.
