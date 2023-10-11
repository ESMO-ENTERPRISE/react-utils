---
sidebar_position: 8
---

# useSessionStorage

Persist the state with session storage so that it remains after a page refresh. This can be useful to record session information. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present (as in SSR), `useSessionStorage()` will return the default value.

Related hooks:

- [`useLocalStorage()`](/docs/hooks/use-local-storage)

```ts
export default function Component() {
  const [value, setValue] = useSessionStorage('test-key', 0)

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => setValue((x: number) => x + 1)}>Increment</button>
      <button onClick={() => setValue((x: number) => x - 1)}>Decrement</button>
    </div>
  )
}
```