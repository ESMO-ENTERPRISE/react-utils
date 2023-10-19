---
sidebar_position: 1
---

# Introduction

A form state manage library, which is simple, easy to use and powerful!

## Example

```tsx
// define your form values type
type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const App = () => {
  const { field, submit } = useForm<FormValues>({
    // handle form submit
    onSubmit: (values: FormValues) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div>
      <h2>Example Form</h2>
      <form onSubmit={submit}>
        {/* use built-in native wrapper for native elements */}
        <input {...native(field('firstName'))} placeholder="First name" />
        <input {...native(field('lastName'))} placeholder="Last name" />
        <input {...native(field('email'))} placeholder="Email" />
        <button>Submit</button>
      </form>
    </div>
  );
};
```