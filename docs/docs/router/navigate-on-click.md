---
sidebar_position: 7
---

# Navigate on click

A `useNavigate` hook is provided which returns a navigation callback. Or a `Link` component.

```tsx
const App = () => {
  const navigate = useNavigate();

  return (
    <a onClick={navigate} href={'/target/path'}>
      <span>Click Here</span>
    </a>
  );
};
```

The callback calls `event.preventDefault()` and pushes the `event.currentTarget.href` onto the browser history.

A url can be passed to the hook in cases where the clickable element does not have an `href` property (eg. buttons).

```tsx
const App = () => {
  const navigate = useNavigate('/target/path');

  return (
    <button onClick={navigate}>
      <span>Click Here</span>
    </button>
  );
};
```

When a url is passed directly to the hook, the callback can be called without an event (eg. `navigate()`), and it will still trigger the navigation.

History state data can be provided and the current history entry can be replaced (instead of pushed) by passing an options object to the hook.

```tsx
const navigate = useNavigate({
  href: '/target/path',
  state: { key: 'value' },
  replace: true,
});
```

A number can be passed to the hook to navigate forward (positive) and backward (negative) through the browser's history, or to reload the page (zero).

```tsx
// Back
const navigate = useNavigate(-1);

// Forward
const navigate = useNavigate(1);

// Reload
const navigate = useNavigate(0);
```

With `Link` component
```tsx
<Link to={"/test"} />
```