---
sidebar_position: 2
---

# Validation

At the moment the only provided validation is `required` to check if field value is empty or not. But you can define custom validators, validate with a regex expression, for example.

```ts
// required validator
name: {
  required: true,
}
```

```ts
// custom validator
password: {
  hasMoreThan6Chars: (val) =>
    val.length >= 6 || "Please enter 6 or more characters",
}
```