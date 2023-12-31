---
sidebar_position: 7
---

# Persist State

```js {5-7,17,23}
const useCatStore = createStore(
  ({ set }) => {
    let savedValue = {};
    try {
      const savedValueString = localStorage.getItem('cat-store');
      // Validate the saved value if necessary, then..
      savedValue = JSON.parse(savedValueString);
    } catch {
      // No saved value, or invalid saved value
    }

    return {
      age: 0,
      isSleeping: false,
      increaseAge: () => set((state) => ({ age: state.age + 1 })),
      reset: () => set({ age: 0, isSleeping: false }),
      ...savedValue
    };
  },
  {
    intercept: (nextState) => {
      // Save to localStorage whenever state changes
      localStorage.setItem('cat-store', JSON.stringify(nextState));
      return nextState;
    },
  },
);
```