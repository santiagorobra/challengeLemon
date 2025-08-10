import { useSelector } from 'react-redux';

import type { RootState } from 'store/rootReducer';

export const useSession = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  return { isAuthenticated, user };
};
