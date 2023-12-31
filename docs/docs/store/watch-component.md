---
sidebar_position: 4
---

# Watch Component

Prevent re-render using `Watch`.

```jsx {26-31}
const useCatStore = createStore(({ set }) => ({
  age: 0,
  isSleeping: false,
  increaseAge: () => set((state) => ({ age: state.age + 1 })),
  reset: () => set({ age: 0, isSleeping: false }),
}));

function CatPage() {
  const { age } = useCatStore((state) => [state.age]);
  // If age changed, this component will re-render which will cause
  // HeavyComponent1 & HeavyComponent2 to be re-rendered as well.
  return (
    <main>
      <HeavyComponent1 />
      <div>Cat's age: {age}</div>
      <HeavyComponent2 />
    </main>
  );
}

// Optimized
function CatPageOptimized() {
  return (
    <main>
      <HeavyComponent1 />
      <useCatStore.Watch
        selectDeps={(state) => [state.age]}
        render={({ age }) => {
          return <div>Cat's age: {age}</div>;
        }}
      />
      <HeavyComponent2 />
    </main>
  );
}
```