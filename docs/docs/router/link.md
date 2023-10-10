---
sidebar_position: 3
---

# Link

A `<Link>` is an element that lets the user navigate to another page by clicking or tapping on it.

```ts
function ProductsPage() {
    return <Link to="/products/1">Product 1</Link>
}
```

```ts
// With custom state
<Link to="/products/1" state={{ name: 'Product 1', clickPos: { x, y } }}>Product 1</Link>
```