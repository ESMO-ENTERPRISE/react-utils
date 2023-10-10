---
sidebar_position: 1
---

# Introduction

## Create router

```ts
// Listen to route changes
routerEvents.addListener(event => console.log(event))

// Specify routes and fallback
const routes = {
  fallback: FallbackPage,
  routes: [
    {
      path: '/',
      exact: true,
      component: HomePage
    },
    {
      path: '/products',
      component: ProductsPage
    },
    {
      path: '/products/:id',
      component: ProductPage
    }
  ]
}

// Router handles the url, params etc and provides the context
// RouterView listenes to context changes and render the correct page
const [Router, RouterView] = createEsmoRouter(routes)

export const App = () => {
  return (
    <Router>
      <Navbar />
      <RouterView />
    </Router>
  )
}
```
