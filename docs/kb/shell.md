# App shell + shared components

## App.vue
`min-h-dvh flex-col` wrapper: `MatrixBackground` (orange 16% glyphs; Gruvbox red on `error` route) → sticky `header` with Navbar → `main` (`max-w-6xl px-4 py-12 sm:py-16`, flex column so views can `flex-1` center) → Footer in normal flow.
Views render `<div>` roots (no nested `<main>`).

## Navbar.vue
- `bg-titlebar/80 backdrop-blur border-b`. Brand: `$` accent + TypingAnimation "Francisco González" (cursor stays).
- Links from `links` array, labels `navbar.*` (path style `/projects`). Active: `exact-active-class` accent text + `bg-accent/10`.
- < lg: `BurgerMenu` (menu/close icon) toggles absolute dropdown — solid `bg-titlebar` + shadow, no own backdrop-blur (nested blur inside the blurred nav let page text bleed through; user wants it fully readable). Closes on route change and click outside.
- LanguageSwitcher at end.

## LanguageSwitcher.vue
Flag buttons (en US, es MX, de DE), selected ring accent. Persists to `localStorage('locale')`, restores on mount, sets `<html lang>`.

## Footer.vue
Static footer: name, degree · university, location; social buttons (LinkedIn, GitHub inverted, Fiverr); `footer.rights` with `{year}` = current year.

## MatrixBackground.vue
Fixed `-z-10` layer: canvas rain (`FONT_SIZE` 18, `FRAME_MS` 70, katakana) + gradient overlays. Prop `letterColor`.

## Console.vue
Ubuntu terminal window. Props: `lines`, `cwd` (title + prompt, default `~`), `fast`, `slow`, `popOut`, `isError`, `returnMessage`.
First row static prompt `francisco@portfolio:<cwd>$ python3`, then typed lines with REPL prefixes. Speeds: normal 14ms/char; fast 4 chars per 10ms tick; slow 45ms/char, 400ms between lines (error page).

## TypingAnimation.vue
Props: `lines`, `prefixes` (static per line), `keepCursor`, `speed` (ms/tick), `charsPerTick`, `lineDelay`. Emits `typing-completed`. Clears timer on unmount. Reduced motion: instant.

## useConsoleIntro (composables)
`useConsoleIntro({ duration = 400, onRevealed })` → `{ consoleContainer, isConsolePoppedOut, handleTypingCompleted }`.
