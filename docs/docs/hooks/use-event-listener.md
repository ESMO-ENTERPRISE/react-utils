---
sidebar_position: 3
---

# useEventListener

Use EventListener with simplicity.

Supports `Window`, `Element` and `Document` and custom events with almost the same parameters as the native [`addEventListener` options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#syntax). See examples below.

If you want to use your CustomEvent using Typescript, you have to declare the event type.
Find witch kind of Event you want to extends:

- `MediaQueryListEventMap`
- `WindowEventMap`
- `HTMLElementEventMap`
- `DocumentEventMap`

Then declare your custom event:

```ts
declare global {
  interface DocumentEventMap {
    'my-custom-event': CustomEvent<{ exampleArg: string }>
  }
}
```

```ts
export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null)
  const documentRef = useRef<Document>(document)

  const onScroll = (event: Event) => {
    console.log('window scrolled!', event)
  }

  const onClick = (event: Event) => {
    console.log('button clicked!', event)
  }

  const onVisibilityChange = (event: Event) => {
    console.log('doc visibility changed!', {
      isVisible: !document.hidden,
      event,
    })
  }

  // example with window based event
  useEventListener('scroll', onScroll)

  // example with document based event
  useEventListener('visibilitychange', onVisibilityChange, documentRef)

  // example with element based event
  useEventListener('click', onClick, buttonRef)

  return (
    <div style={{ minHeight: '200vh' }}>
      <button ref={buttonRef}>Click me</button>
    </div>
  )
}
```