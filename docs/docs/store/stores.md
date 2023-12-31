---
sidebar_position: 9
---

# Stores

The concept is same as [store](/docs/store/introduction), but this can be used for multiple stores.

## Create a Stores

```ts
import { createStores } from '@esmo/react-utils';

const useCatStores = createStores(
  ({ set, get, key }) => ({
    //         ^store key
    age: 0,
    isSleeping: false,
    increaseAge: () => set((state) => ({ age: state.age + 1 })),
    reset: () => set({ age: 0, isSleeping: false }),
  })
);
```

```ts
import { createStores } from '@esmo/react-utils';

type CatStoreKey = { catId: number };
type CatStore = { age: number; isSleeping: boolean; increaseAge: () => void; reset: () => void };

const useCatStores = createStores<CatStoreKey, CatStore>(
  ({ set, get, key }) => ({
    //         ^store key
    age: 0,
    isSleeping: false,
    increaseAge: () => set((state) => ({ age: state.age + 1 })),
    reset: () => set({ age: 0, isSleeping: false }),
  })
);
```

## Using a Stores as Hook

We need to specify the store key (an object) as identifier.

```tsx {17,23}
function CatPage() {
  const [catId, setCatId] = useState(1);

  return (
    <>
      <div>Current cat id: {catId}</div>
      <button onClick={() => setCatId((prev) => prev - 1)}>Prev cat</button>
      <button onClick={() => setCatId((prev) => prev + 1)}>Next cat</button>

      <Cat catId={catId} />
      <Control catId={catId} />
    </>
  );
}

function Cat({ catId }) {
  const { age } = useCatStores({ catId });
  return <div>Cat's age: {age}</div>;
}

function Control({ catId }) {
  const { increaseAge } = useCatStores(
    { catId },
    (state) => [state.increaseAge]
  );
  return <button onClick={increaseAge}>Increase cat's age</button>;
}
```

## Using Store Outside Component

Reading/writing state and reacting to changes outside of components.

```ts {2,7,12}
const alertCatAge = () => {
  alert(useCatStore.get({ catId: 3 }).age);
  //                      ^ get cat store with catId: 3
};

const toggleIsSleeping = () => {
  useCatStore.set({ catId: 7 }, (state) => ({ isSleeping: !state.isSleeping }));
  //                ^ get cat store with catId: 7
};

const unsub = useCatStore.subscribe(
  { catId: 9 },
  (state) => {
    console.log('The value of age for catId 9 is changed!', state.age);
  },
  (state) => [state.age],
);
```

## Stores Methods

Stores method is a way to do something with the store outside of a component like what we've learned before.

```ts {8,11,14,17}
import { createStore, createStores } from '@esmo/react-utils';

type State = { age: number }
const useCatStore  = createStore<State>(() => ({ age: 0 }));
const useFoxStores = createStores<{ id: string }, State>(() => ({ age: 0 }));

const getCatAge = () => useCatStore.get().age;
const getFoxAge = ({ id }) => useFoxStore.get({ id }).age;

const resetCatAge = () => useCatStore.set({ age: 0 });
const resetFoxAge = ({ id }) => useFoxStore.set({ id }, { age: 0 });

const subscribeCat = () => useCatStore.subscribe(console.log);
const subscribeFox = ({ id }) => useFoxStore.subscribe({ id }, console.log);

const getSubscribersOfCat = () => useCatStore.getSubscribers();
const getSubscribersOfFox = ({ id }) => useFoxStore.getSubscribers({ id });
```

Stores-only (not available in `createStore`) methods:

```ts
useCatStores.getAll();
// Returns array of store state

useCatStores.getAllWithSubscriber();
// Returns array of store state, but only for stores with subscribers
```

## Store Key

When using stores, the store key is a store identifier. It **should** be an object.
The default hashing mechanism is by sorting the object keys and stringify it.
And of course we can customize it using `hashKeyFn` option.

```tsx {14}
import {
  createStores,
  hashStoreKey, // Default hash function
} from '@esmo/react-utils';

const useProductStores = createStores(
  ({ get, set, key, keyHash }) => {
    console.log(key, keyHash); // Check key (object) and keyHash (string)
    return {
      data: null,
    };
  },
  {
    hashKeyFn: myCustomHashFn, // Customize here
  },
);

useProductStores({ keyword: 'esmo' });
// Hash: '{"id":"esmo"}'

useProductStores({ keyword: 'esmo', sort: 'asc' });
// Hash: '{"id":"esmo","sort":"asc"}'

useProductStores({ sort: 'asc', keyword: 'esmo' });
// Hash: '{"id":"esmo","sort":"asc"}'
```

If the hashed store key is same, it will use the same stored state.