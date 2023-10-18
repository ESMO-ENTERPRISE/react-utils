---
sidebar_position: 6
---

# Mutation

A Hook that can be used to mutate remote data. Very similar to `useMutation` Hook of [`react-query`](https://www.npmjs.com/package/@tanstack/react-query).

```jsx
useMutation(mutator, callbacks?)
```

**Parameters**

- `mutator` - a function to mutate remote data. For example :

```js
const mutatePets = (newPet) => fetch(url, { method: 'POST', body: JSON.stringfy(newPet), ... }).then(res => res.json());
```

- `callbacks` - an object with a collection of callback functions.
  - `onMutate(newData)` - asynchronous function that will be invoked before actual mutation. Other callbacks accept context object returned from this function.
  - `onSuccess(mutatedData, context)` - will be invoked when the remote data has been mutated.
  - `onError(err, newData, context)` - will be invoked if mutation failed.
  - `onSettled(newData, err, context)` - will be invoked whether or not succeeded or failed.
