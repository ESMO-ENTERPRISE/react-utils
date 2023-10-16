---
sidebar_position: 8
---

# Redirect on mount

The `Redirect` component can be used to replace the current history entry as soon as it is mounted. The history entry is _always_ replaced (not pushed) to avoid blocking back navigation.

```tsx
const App = () => {
  return (
    <Route path={'/go-home'}>
      <Redirect href="/" />
    </Route>
  );
};
```

It also accepts an optional `state` property to set history state data.

```tsx
const App = () => {
  return (
    <Route path={'/go-home'}>
      <Redirect href="/" state={{ key: 'value' }} />
    </Route>
  );
};
```