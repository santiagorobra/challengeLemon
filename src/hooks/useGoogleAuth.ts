import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { GOOGLE_SIGN_IN_IOS_CLIENT_ID } from '@env';
import { clearCredentials, setCredentials } from 'store/authSlice';
import { STRINGS } from 'constants/strings';
import { logger } from 'utils/logger';

type GoogleError = { code?: string; message?: string };

const GOOGLE_ERROR_MAP: Record<string, string> = {
  [statusCodes.SIGN_IN_CANCELLED]: STRINGS.LOGIN.GOOGLE.ERROR_CANCELLED,
  [statusCodes.IN_PROGRESS]: STRINGS.LOGIN.GOOGLE.ERROR_IN_PROGRESS,
  [statusCodes.PLAY_SERVICES_NOT_AVAILABLE]:
    STRINGS.LOGIN.GOOGLE.ERROR_PLAY_SERVICES,
};

const getGoogleErrorMessage = (err: unknown): string => {
  const code = (err as GoogleError)?.code;
  return (
    (code && GOOGLE_ERROR_MAP[code]) || STRINGS.LOGIN.GOOGLE.ERROR_UNEXPECTED
  );
};

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const configure = async () => {
    try {
      GoogleSignin.configure({
        iosClientId: GOOGLE_SIGN_IN_IOS_CLIENT_ID,
      });
    } catch (e) {
      logger.error('Error configuring Google Sign-In:', e);
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      setError('');
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      if (!data) {
        throw new Error(STRINGS.LOGIN.GOOGLE.ERROR_NO_USER_INFO);
      }

      const user = {
        id: data?.user?.id ?? null,
        email: data?.user?.email ?? null,
        name: data?.user?.name ?? null,
        photo: data?.user?.photo ?? null,
      };
      const creds = {
        idToken: data?.idToken ?? null,
        serverAuthCode: data?.serverAuthCode ?? null,
        accessToken: undefined,
      };
      dispatch(setCredentials({ user, creds }));
    } catch (e: any) {
      setError(getGoogleErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(clearCredentials());
    } catch (e) {
      logger.error('Error signing out:', e);
    }
  };

  return {
    configure,
    GoogleSigninButton,
    loading,
    error,
    signIn,
    signOut,
  };
};
