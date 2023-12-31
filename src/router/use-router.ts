import { useContext } from 'react';

import { RouterContext } from './router-context';

const useRouter = () => {
  const router = useContext(RouterContext);

  if (!router) {
    throw new Error('Router parent is required.');
  }

  return router;
};

export { useRouter };
