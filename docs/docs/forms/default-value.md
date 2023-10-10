---
sidebar_position: 3
---

# Default value

Define a default value for inputs or textareas.

```ts
const { inputs, handleSubmit, errors, handleChange } = useForm({
  defaultValues: { name: "", password: "" }
})
```