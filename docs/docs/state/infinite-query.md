---
sidebar_position: 3
---

# Infinite Query

A Hook that can be used to fetch data infinitely. Unlike other Hooks, will not synchronize data across multiple Hooks with the same `queryKey`. Syntaxes are very similar to `useInfiniteQuery` Hook of [`react-query`](https://www.npmjs.com/package/@tanstack/react-query).

```jsx
useInfiniteQuery(queryKey, fetcher, options);
```

> Unlike `useQuery`, this Hook will not synchronize data between of this Hooks. If you use this Hook in two components with the same `queryKey`, unexpected behaviors will occur.

> If you want to update data of this Hooks via `setQueryData` or `setQueriesData`, you should not pass `querySetter` as a function. Instead, pass `array` that represent a new page.


## Usage
```jsx
const fetchColors = ({  param  }) => {
	return  fetch(`http://.../users?_limit=10&_page=${param.pageParam}`).then((res)  =>  res.json());
};

export default function InfiniteQuery()  {

	const { data: pages, fetchNextPage, hasNextPage, hasPreviousPage, isLoading, isFetching, isFetchingNextPage } = useInfiniteQuery("colors",  fetchColors,  {
          getNextPageParam(_lastPage,  pages)  {
            if (pages.length  <  4) {
              return  pages.length  +  1;
            }
            return  undefined;
          },
          getPrevPageParam(_firstPage,  pages) {
            if (pages.length  >  1) {
              return  pages.length  -  1;
            }
            return  undefined;
          });

  if (isLoading) return  <div>Loading...</div>;

  return (
	  <div>
		  {isFetching  &&  <p>Fetching...</p>}
		  {isFetchingNextPage  &&  <p>Fetching Next Page...</p>}
		  <div>
			  {pages?.map((page,  i)  => (
				  <Fragment  key={i}>
					  {
						  page.map((color)  => (
							  <h2  key={color.id}>
								  {color.id}. {color.label}
							  </h2>
							 ));
					  }
				  </Fragment>
			 ))}
		 </div>
		 <div>
			 <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>
		 </div>
	</div>
);
}
```