---
sidebar_position: 6
---

# Nested routes

The leading slash can be omitted from a nested route to make the pattern relative to a parent pattern (without the trailing wildcard).

```tsx
const App = () => {
  return (
    <Route path={'/parent/*'}>
      <Route path={'child'}>
        <p>Matches pattern "/parent/child"</p>
      </Route>
      <Route path={''}>
        <p>Matches pattern "/parent/"</p>
      </Route>
      <Route path={'*'}>
        <p>Matches pattern "/parent/*"</p>
      </Route>
    </Route>
  );
};
```
