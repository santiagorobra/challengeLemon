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
      console.log('Error configuring Google Sign-In:', e);
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
      setLoading(false);
      if (e?.code === statusCodes.SIGN_IN_CANCELLED) {
        setError(STRINGS.LOGIN.GOOGLE.ERROR_CANCELLED);
      } else if (e?.code === statusCodes.IN_PROGRESS) {
        setError(STRINGS.LOGIN.GOOGLE.ERROR_IN_PROGRESS);
      } else if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError(STRINGS.LOGIN.GOOGLE.ERROR_PLAY_SERVICES);
      } else {
        setError(STRINGS.LOGIN.GOOGLE.ERROR_UNEXPECTED);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(clearCredentials());
    } catch (e) {
      console.log('Error signing out:', e);
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
