---
sidebar_position: 2
---

# Navigate

```ts
export const ProductsPage = () => {
    const { navigate } = useNavigation()
    return (
      <div>
        PRODUCTS
        <ul>
          <li onClick={() => navigate('/products/1')}>Product 1</li>
          <li onClick={() => navigate('/products/2')}>Product 2</li>
          <li onClick={() => navigate('/products/3')}>Product 3</li>
        </ul>
      </div>
    )
  }
```

```ts
// With custom state
navigate('/products/3', { name: 'Product 3', clickPos: { x, y } })
```