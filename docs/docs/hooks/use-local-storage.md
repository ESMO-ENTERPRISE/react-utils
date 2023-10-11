---
sidebar_position: 5
---

# useLocalStorage

Persist the state with local storage so that it remains after a page refresh. This can be useful for a dark theme.
This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter.
If the window object is not present (as in SSR), `useLocalStorage()` will return the default value.

```ts
export default function Component() {
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true)

  const toggleTheme = () => {
    setDarkTheme((prevValue: boolean) => !prevValue)
  }

  return (
    <button onClick={toggleTheme}>
      {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
    </button>
  )
}
```