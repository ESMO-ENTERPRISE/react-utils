---
sidebar_position: 5
---

# Offline Mutation

Offline mutation support means: when offline, we postpone mutations until we are back online.
I got that definition from an example in [TanStack Query](https://tanstack.com/query/latest/docs/react/examples/react/offline).
We can implement this behavior on react-utils too.

```jsx
const mutationQueue = [];

const resumeMutation = () => {
  if (mutationQueue.length) {
    updateProfileMutation.get().mutate(mutationQueue[0]);
  } else {
    window.removeEventListener('online', resumeMutation);
  }
};

const updateProfileMutation = createMutation(
  ({ offlineQueue, ...variables }) => {
    if (!navigator.onLine) {
      if (!offlineQueue) mutationQueue.push({ ...variables, offlineQueue: true });
      window.addEventListener('online', resumeMutation);
      return Promise.reject('offline');
    }
    return updateProfile(variables);
  },
  {
    onSuccess: (response, variables) => {
      if (variables.offlineQueue) {
        mutationQueue.shift();
        resumeMutation();
      }
    },
    onError: (error, variables) => {
      if (variables.offlineQueue && error !== 'offline') {
        mutationQueue.shift();
        resumeMutation();
      }
    },
  }
);
```