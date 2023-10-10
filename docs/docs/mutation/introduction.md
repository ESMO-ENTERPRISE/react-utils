---
sidebar_position: 1
---

# Introduction

## Creating the Store/Hook

```jsx
import { createMutation } from '@esmo/react-utils';

const useLoginMutation = createMutation(
  async (variables) => {
    const res = await axios.post('/auth/login', {
      email: variables.email,
      password: variables.password,
    });
    return res.data;
  },
  {
    onSuccess: (response, variables) => {
      console.log(`Logged in as ${variables.email}`);
      console.log(`Access token: ${response.data.accessToken}`);
    },
  },
);
```

```tsx
import { createMutation } from '@esmo/react-utils';

type LoginVariable = {
  email: string;
  password: string;
}
type LoginResponse = {
  success: boolean;
  data: { accessToken: string };
};

const useLoginMutation = createMutation<LoginVariable, LoginResponse>(
  async (variables) => {
    const res = await axios.post('/auth/login', {
      email: variables.email,
      password: variables.password,
    });
    return res.data;
  },
  {
    onSuccess: (response, variables) => {
      console.log(`Logged in as ${variables.email}`);
      console.log(`Access token: ${response.data.accessToken}`);
    },
  },
);
```

## Using Mutation Hook Inside a Component

```jsx
function Login() {
  const { mutate, isWaiting } = useLoginMutation();
  const showToast = useToast();

  return (
    <button
      disabled={isWaiting}
      onClick={() => {
        mutate({ email: 'foo@bar.baz', password: 's3cREt' })
          .then(({ response, error }) => {
            if (error) showToast('Login failed');
            else showToast('Login success');
          });
      }}
    >
      Login
    </button>
  );
}
```
