---
sidebar_position: 4
---

# Experimental infinite query

A Hook that can be used to fetch data infinitely. Like `useInfiniteQuery` Hook, will not synchronize data across multiple Hooks with the same `queryKey`. This Hook was built on top of `useInfiniteQuery`. As the name implies, this Hook is just for experimenting. It's not stable yet.

> This Hook will invoke `fetchNextPage` function automatically when the scroll position reaches the bottom.

```jsx
useExperimentalInfiniteScrollQuery(
  queryKey,
  fetcher,
  containerRef,
  options
);
```

## Usage
```jsx
const fetchUsers = ({ param }) => {
  return fetch(`http://.../users?_limit=5&_page=${param.pageParam}`).then(
    (res) => res.json()
  );
};

const options = {
  offsetBottom: 0,
  getNextPageParam(_lastPage, pages) {
    if (pages.length < 5) {
      return pages.length + 1;
    }
    return undefined;
  },
  onReset: (fetchPage) => {
    fetchPage(1);
  },
};

export default function InfiniteScrollQuery() {
  const containerRef = useRef(null);
  const {
    data: usersPages,
    isFetchingNextPage,
    isFetching,
    reset,
  } = useExperimentalInfiniteQuery(
    ["users"],
    fetchUsers,
    containerRef,
    options
  );

  return (
    <div style={{ position: "relative" }}>
      {(isFetchingNextPage || isFetching) && (
        <p style={{ width: "100px", position: "absolute", top: 0, right: 0 }}>
          Fetching...
        </p>
      )}
      <div
        ref={containerRef}
        style={{
          height: "600px",
          overflowY: "auto",
          padding: "10px 20px",
          background: "rgba(0, 0, 0, 0.2)",
          border: "2px solid red",
        }}
      >
        {usersPages?.map((usersPage, i) => (
          <Fragment key={i}>
            {usersPage.map((user) => (
              <div
                key={user.id}
                style={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "space-around",
                  border: "1px solid yellow",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "10px 15px",
                  marginBottom: "10px",
                }}
              >
                <h2>
                  {user.id}. {user.name}
                </h2>
                <p>{user.alterEgo}</p>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
```