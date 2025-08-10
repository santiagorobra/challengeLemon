import { useEffect } from 'react';

import { useGoogleAuth } from './useGoogleAuth';

export const useAppInit = () => {
  const { configure: configureGoogleAuth } = useGoogleAuth();

  useEffect(() => {
    const init = async () => {
      try {
        await configureGoogleAuth();
      } catch (err) {
        console.error('Error initializing app:', err);
      }
    };

    init();
  }, [configureGoogleAuth]);
};
