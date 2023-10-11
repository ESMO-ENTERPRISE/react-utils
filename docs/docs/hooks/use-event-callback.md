---
sidebar_position: 2
---

# useEventCallback

`useEventCallback` is a React Hook that lets you cache a function definition between re-renders

```ts
export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useEventCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```