---
sidebar_position: 3
---

# Standard form component

We defined standard form component to provide developers with a consistent development experience across different UI libraries.

## Standard Form Component Props

A standard form component should have following props:

```ts
type StandardFormComponentProps = {
  value: any; // form component state
  onChange: (value: any) => void; // change form component state

  /**
   * following props is optional
   * you can implement it if you want to have better validation interactions
   */
  onBlur?: () => void; // use for validate after touched
  ref?: any; // use for auto-focus when validate failed
};
```

## Convert To Standard Form Component

Most of React UI library's form components conforms to standard form component.

Covert non-conforming form component to standard form component:

- For native or native-like form component, you can use built-in [native](/docs/api) wrapper.
- For other components, you can add a simple wrapper. [Chakra UI integration](/docs/forms/third-party-integration).