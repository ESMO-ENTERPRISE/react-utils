---
sidebar_position: 2
---

# Route

Use the `Route` component.

```tsx
const App = () => {
  return (
    <Route path={'/foo'}>
      <p>Only rendered if the route is exactly "/foo".</p>
    </Route>,
  );
};
```

The `path` property also accepts an array of paths.

```tsx
const App = () => {
  return (
    <Route path={['/foo', '/bar']}>
      <p>Only rendered if the route is exactly "/foo" or "/bar".</p>
    </Route>,
  );
};
```

Routes can also be matched with the `useRoute` hook.

```tsx
// Match a single path...
const match = useRoute('/foo');

// Or, multiple paths...
const match = useRoute(['/foo', '/bar']);
```

The returned match will be `null` if the route is not matched, or an object containing [match data](/docs/router/match-data) if the route is matched.