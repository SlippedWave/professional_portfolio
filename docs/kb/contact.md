# Contact section (`/contact`, `views/ContactView.vue`)

## Layout
Two columns (lg): left = prompt `$ ./say-hello.sh`, `contact_form.title/subtitle`, panel "Or reach me directly" (`contact_view.direct`) with Email, LinkedIn, GitHub. Email is protected: never write the plain address in source/docs; use `getEmail()` / `openMailClient()` from `src/assets/js/protected_email.js` (reversed + base64; mailto built on click). Right = `ContactForm`.

## ContactForm.vue
- `.panel` form, `novalidate`. Fields: name + lastname (2 cols), email (+ disclaimer), subject, interest pills (radio `sr-only`, values job|project|other), conditional company (job) or projectDescription (project/other), message.
- Validation: `errors` pure computed; `visibleErrors` only after first submit (`submitted`).
- Turnstile: rendered into `turnstileEl` ref, dark theme; script injected once, reused on later visits; `turnstileError` message.
- Submit: `axios.post(VITE_SERVER_ADDRESS, form)`; inline success (prompt green) / error (danger) banners, resets form + Turnstile on success.
- Scoped `.label` / `.error` via `@reference` + `@apply`.

## Open
- Turnstile token is still NOT sent to the server (payload unchanged on purpose; backend contract unknown). Server-side verification needs both ends changed.
