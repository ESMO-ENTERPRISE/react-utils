---
sidebar_position: 2
---

# Query

A Hook to make developer's life easier. This Hook will help you in fetching data and keep you away from handling caches. You don't need to implement imperative stuffs. You can also use this Hook to manage state. Other Hooks, except `useMutation`, were built on top of this Hook.

```jsx
useQuery(queryKey, fetcher?, options?)
```

**Parallel Data Query**

```jsx
const { data: users } = useQuery("users", fetcher, options);
const { data: pets } = useQuery("pets", fetcher, options);
```

**Dependent Data Query**
_Fetch channel after the user becomes available_

```jsx
const { data: user } = useQuery(`user`, fetcher, options);
const { data: channel } = useQuery(["channel", user?.id], fetcher, {
  autoFetchEnabled: !!user?.id,
});
```

**Paginated Data Query**

You can fetch paginated data using this Hook. For example :

```jsx
const fetcher = (context) => {
  const { queryKey } = context;
  return fetch(`https://.../pets?page=${queryKey[1]}`).then((res) =>
    res.json()
  );
};

// To keep previous value until the data for the next page is ready
const options = { keepValueOnKeyChanges: true };
export const Pets = (props) => {
  const [page, setPage] = useState(0);
  const { data: pets, isFetching } = useQuery(
    [`pets`, page],
    fetcher,
    options
  );

  return (
    <div>
      {isFetching && <p class="status">Fetching...</p>}
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
      <button onClick={() => setPage((p) => p - 1)}>Prev</button>
      <div>
        {pets?.map((pet) => {
          // return your jsx
        })}
      </div>
    </div>
  );
};
```