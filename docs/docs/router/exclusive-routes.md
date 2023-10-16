---
sidebar_position: 5
---

# Exclusive routes

To match only one route from a set, wrap the `Route` components in a `Routes` parent.

```tsx
const App = () => {
  return (
    <Routes>
      <Route path={'/user/settings'}>...</Route>
      <Route path={'/user/:id'}>
        <p>Never matches "/user/settings" due to the previous route.</p>
      </Route>
      <Route>
        <p>Catch-all route matches anything not matched above.</p>
      </Route>
    </Routes>
  );
};
```

**NOTE:** The `useRoute` hook is not affected by a `<Routes>` parent.