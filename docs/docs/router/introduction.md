---
sidebar_position: 1
---

# Introduction

## Create router
Wrap your application with a router: `BrowserRouter`, `BrowserHashRouter`, or `MemoryRouter`.

```ts
return (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
```

Any component or hook which depends on a router, will throw an error if no router parent is present.

The `BrowserHashRouter` is useful when the application's server does not support SPAs (eg. GitHub Pages). An SPA-compatible server will serve the application index file when a non-existent path is requested.

The `MemoryRouter` is useful for SSR and testing, when there is no window global.