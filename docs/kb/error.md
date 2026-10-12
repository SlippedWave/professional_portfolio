# Error section (`/error/:code`, `views/ErrorView.vue`)

- Catch-all route redirects to `/error/404`.
- `code`: "404" → `errors_view.notFoundErrorConsoleLines`, "500" → `serverErrorConsoleLines`, else `unknownErrorConsoleLines`.
- Console `cwd="~/error"`, `slow` (45ms/char, 400ms line pause — user wants error page typed slower), `isError` (danger text), `popOut=false`; after typing shows link home (`error_message_recomendations.clickToRedirectHome`).
- `v-motion-pop` on wrapper; `consoleKey` bumped on locale change to retype.
- App.vue turns rain red on this route.
