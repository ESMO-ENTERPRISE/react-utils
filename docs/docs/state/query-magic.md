---
sidebar_position: 5
---

# Query Magic

A Hook that can be used to control caches and network requests. Mostly uses to manage state.

```jsx
useQueryMagic();
```

> You can use this Hook in optimistic updates

**Optimistic Update**
Assume that `Pets` component display a list of pets.

```jsx
const fetcher = (context) => { //... your implementations };
const options = { cacheTime: 1000 * 60 * 10, ...};

export const Pets = (props) => {
	const { data: pets, isFetching } = useQuery(`pets`, fetcher, options);
	return (
		<div>
			{isFetching && <p>Fetching...</p>
			{pets?.map(pet => {
				// ... return your jsx
			});
		</div>
	)
}
```

Somewhere in other components or within `Pets` component :

```jsx
const { setDataQuery, getDataQuery, cancelQuery, invalidateQuery } = useQueryMagic();
const { isMutating, mutate: addNewPet } = useMutation((newPet) => {
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
const handleAddPet = (newPet) => {
	addPet(newPet);
}
```

**Manage State**
_You can use `useQuery` and `useQueryMagic` to synchronize data between multiple components._

_Header.jsx_

```jsx
const { setQueryData } = useQueryMagic();
// Function that synchronize data(theme) between multiple components
const toggleTheme = () => setQueryData("theme", (light) => !light);
```

_Profile.jsx_

```jsx
const { data: theme } = useQuery("theme", undefined, {
  autoFetchEnabled: false,
}); // Don't forget to disable autoFetchEnabled
```

_Settings.jsx_

```jsx
const { data: theme } = useQuery("theme", undefined, {
  autoFetchEnabled: false,
});
```