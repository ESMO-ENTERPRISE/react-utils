---
sidebar_position: 1
---

# Introduction

## Create a Store

```ts
import { createStore } from '@esmo/react-utils';

const useCatStore = createStore(({ set }) => ({
  age: 0,
  isSleeping: false,
  increaseAge: () => set((state) => ({ age: state.age + 1 })),
  reset: () => set({ age: 0, isSleeping: false }),
}));
```

```ts
import { createStore } from '@esmo/react-utils';

type CatStore = {
  age: number;
  isSleeping: boolean;
  increaseAge: () => void;
  reset: () => void;
};
const useCatStore = createStore<CatStore>(({ set }) => ({
  age: 0,
  isSleeping: false,
  increaseAge: () => set((state) => ({ age: state.age + 1 })),
  reset: () => set({ age: 0, isSleeping: false }),
}));
```

## Use the Hook Anywhere

No providers are needed.

```jsx
function Cat() {
  const { age } = useCatStore((state) => [state.age]);
  return <div>Cat's age: {age}</div>;
}

function Control() {
  const { increaseAge } = useCatStore((state) => [state.increaseAge]);
  return <button onClick={increaseAge}>Increase cat's age</button>;
}
```

## Control the Reactivity

The concept is same as `useEffect` dependency array.

```jsx
function Cat() {
  const { age, isSleeping } = useCatStore();
  // Will re-render every state change    ^
  return <div>...</div>;
}

function Cat() {
  const { age, isSleeping } = useCatStore((state) => [state.isSleeping]);
  // Will only re-render when isSleeping is updated   ^
  // Update on age won't cause re-render this component
  return <div>...</div>;
}

function Cat() {
  const { age, isSleeping } = useCatStore((state) => [state.age, state.isSleeping]);
  // Will re-render when age or isSleeping is updated ^
  return <div>...</div>;
}

function Cat() {
  const { age, isSleeping } = useCatStore((state) => [state.age > 3]);
  // Will only re-render when (age>3) is updated
  return <div>...</div>;
}
```

## Set Default Reactivity

```jsx {9}
const useCatStore = createStore(
  ({ set }) => ({
    age: 0,
    isSleeping: false,
    increaseAge: () => set((state) => ({ age: state.age + 1 })),
    reset: () => set({ age: 0, isSleeping: false }),
  }),
  {
    defaultDeps: (state) => [state.age],
  },
);

function Cat() {
  const { age } = useCatStore();
  //                          ^will only re-render when age changed
  return <div>Cat's age: {age}</div>;
}
```

## Using Store Outside Component

Reading/writing state and reacting to changes outside of components.

```js
const alertCatAge = () => {
  alert(useCatStore.get().age);
};

const toggleIsSleeping = () => {
  useCatStore.set((state) => ({ isSleeping: !state.isSleeping }));
};

const unsub = useCatStore.subscribe(
  // Action
  (state) => {
    console.log('The value of age is changed!', state.age);
  },
  // Reactivity dependency (just like useEffect dependency mentioned above)
  (state) => [state.age],
  // ^If not set, the action will be triggered on every state change
);

const getSubscribersOfCat = () => useCatStore.getSubscribers();
```

## Important Notes

Don't mutate.

```js
import { createStore } from '@esmo/react-utils';

const useCartStore = createStore(({ set, get }) => ({
  products: [],
  addProduct: (newProduct) => {
    const currentProducts = get().products;
    product.push(newProduct); // ❌ Don't mutate
    set({ product });
  },
}));
```

Don't use conditional reactivity selector.

```jsx
function Cat({ isSomething }) {
  const { age } = useCatStore(isSomething ? (state) => [state.age] : null); // ❌
  const { age } = useCatStore((state) => (isSomething ? [state.age] : [state.isSleeping])); // ❌
  ...
}
```

No need to memoize the reactivity selector.

```jsx
function Cat() {
  const selectAge = useCallback((state) => [state.age], []); // ❌
  const { age } = useCatStore(selectAge);
  ...
}
```

No need to memoize the store key / query key.

```jsx
function PokemonsPage() {
  const queryKey = useMemo(() => ({ generation: 'ii', sort: 'asc' }), []); // ❌
  const { isLoading, data } = usePokemonsQuery(queryKey);
  ...
}
```