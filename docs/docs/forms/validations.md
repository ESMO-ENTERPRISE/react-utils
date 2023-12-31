---
sidebar_position: 2
---

# Form validation

We support form validation, also can set form validation interactions:

- Validate after form component touched (before submit).
- Auto-focus first validate failed form component.

## How To Use Form Validation

You can enable form validation by set `useForm` hook `onValidate` handler, also you can on/off validation interactions by set `isValidateOnTouched` & `isFocusOnValidateFailed`.

```tsx
// use hasError, getError to get field error message
const { field, hasError, getError } = useForm<FormValues>({
  // enable form validation
  onValidate: (values: FormValues) => {
    const formErrors: FormErrors<FormValues> = new Map();
    // handle form validation logic...
    return formErrors;
  },
  // enable validation interactions
  isValidateOnTouched: true,
  isFocusOnValidateFailed: true,
});
```

## Usage
```tsx
type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const App = () => {
  const { field, submit, hasError, getError } = useForm<FormValues>({
    onSubmit: (values: FormValues) => {
      alert(JSON.stringify(values));
    },
    // handle form validate
    onValidate: (values: FormValues) => {
      const formErrors: FormErrors<FormValues> = new Map();
      if (!values.firstName) {
        formErrors.set('firstName', 'First name is required');
      }
      if (!values.lastName) {
        formErrors.set('lastName', 'Last name is required');
      }
      if (!values.email) {
        formErrors.set('email', 'Email is required');
      }
      return formErrors;
    },
    // enable validation interactions
    isValidateOnTouched: true,
    isFocusOnValidateFailed: true,
  });

  return (
    <div>
      <h2>Form Validation - React Happy Form</h2>
      <form onSubmit={submit}>
        <input {...register(field('firstName'))} placeholder="First name" />
        {/* show field error */}
        {hasError('firstName') && <span>{getError('firstName')}</span>}
        <input {...register(field('lastName'))} placeholder="Last name" />
        {hasError('lastName') && <span>{getError('lastName')}</span>}
        <input {...register(field('email'))} placeholder="Email" />
        {hasError('email') && <span>{getError('email')}</span>}
        <button>Submit</button>
      </form>
    </div>
  );
};
```