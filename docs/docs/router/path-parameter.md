---
sidebar_position: 3
---

# Path parameters
Non-exact paths can be matched using path parameters.

```tsx
const User = () => {
  const { params } = useRouteMatch();
  return <div>UserID: {params.id}</div>;
};

const App = () => {
  return (
    <Route path={'/user/:id'}>
      <User />
    </Route>
  );
};
```

Parameter names can only contain letters, numbers, and underscores (`_`). If two parameters with the same name are present, only the value for the last one will be captured.

Path parameters are never optional, and will (non-greedy) match everything up to the next forward slash (`/`).

Because parameters are non-greedy, they can be separated by any character other than a number, letter, or underscore (eg. `:foo-:bar`). However, If there is no separator between parameters (eg. `:foo:bar`), every parameter except the last one will always be empty (`""`).

A path may also end with a wildcard (`/*`). Wildcards are only allowed at the end of a path, and must be preceded by a forward slash. The value matched by the wildcard is stored in `params["*"]`. An asterisk (`*`) anywhere else else in the path is matched literally.

```tsx
const File = () => {
  const { params } = useRouteMatch();
  return <div>Filename: {params['*']}</div>;
};

const App = () => {
  return (
    <Route path={'/file/*'}>
      <File />
    </Route>
  );
};
```