---
sidebar_position: 6
---

# Mutation

A Hook that can be used to mutate remote data. Very similar to `useMutation` Hook of [`react-query`](https://www.npmjs.com/package/@tanstack/react-query).

## Usage

```jsx
const { isMutating, mutate: addNewPet } = useDataMutation((newPet) => {
      return fetch(url, { body: JSON.stringfy(newPet), ... }).then(res => res.json());
    },
    {
      // this callback will be invoked before `mutator` function with the same argument.
      onMutate(newPet) {
        const prevPets = getDataQuery(`pets`);
        // Cancel ongoing network request if it exists. So that there will not be like data conflicts due to optimistic update.
        await cancelQuery(`pets`);
        // Users will see immediate result before acutal mutation begins
        setDataQuery(`pets`, (oldPets) => ({...oldPets, newPet});
        // return context object
        return { prevPets };
      },
      onError(_err, _newPet, context) {
        // consumes context returned from onMutate callback. If mutation failed, set previous pets.
        setDataQuery(`pets`, context.prevPets);
      },
      onSettled(_newPet, _error, context) {
        // invalidate to ensure the data is fresh
        invalidateQuery(`pets`);
      }
    });
```