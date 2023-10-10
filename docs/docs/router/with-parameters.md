---
sidebar_position: 4
---

# Read parameters

```ts
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