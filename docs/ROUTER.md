# Usage

```javascript
// Listen to route changes
routerEvents.addListener(event => console.log(event))

// Specify routes and fallback
const routes = {
  fallback: FallbackPage,
  routes: [
    {
      path: '/',
      exact: true,
      component: HomePage
    },
    {
      path: '/products',
      component: ProductsPage
    },
    {
      path: '/products/:id',
      component: ProductPage
    }
  ]
}

// Router handles the url, params etc and provides the context
// Routes listenes to context changes and render the correct page
const [Router, RouterView] = createEsmoRouter(routes)

export const App = () => {
  return (
    <Router>
      <Navbar />
      <RouterView />
    </Router>
  )
}
```

# Navigate

### Using the hook
```javascript
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

  // With custom state
  navigate('/products/3', { name: 'Product 3', clickPos: { x, y } })
```

### Using <Link> component
```javascript
  function ProductsPage() {
    return <Link to="/products/1">Product 1</Link>
  }

  // With custom state
  <Link to="/products/1" state={{ name: 'Product 1', clickPos: { x, y } }}>Product 1</Link>
```

## Read params
```javascript
 interface RouteState {
    name: string,
    clickPos: { x: number, y: number }
  }

  export const ProductPage = () => {
    const { params, state: { routeState } } = useNavigation<{ id: string }, RouteState>()

    return (
      <div>
        Product number: {params.id}
        Name from state: {routeState?.name}
        Pos from state: {routeState?.clickPos.x}, {routeState?.clickPos.y}
      </div>
    )
  }
```