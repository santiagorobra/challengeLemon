import React, { JSX, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import BaseScreen from 'components/BaseScreen';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';
import { useGoogleAuth } from 'hooks/useGoogleAuth';
import { useSession } from 'hooks/useSession';
import { clearHistory } from 'store/scannerHistorySlice';

import styles from './styles';

function ProfileScreen(): JSX.Element {
  const { signOut } = useGoogleAuth();
  const { user } = useSession();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    signOut();
    dispatch(clearHistory());
  }, [signOut, dispatch]);

  return (
    <BaseScreen>
      <AppText variant="title">{STRINGS.PROFILE.TITLE}</AppText>
      <AppText variant="subtitle" style={styles.emailText}>
        {STRINGS.PROFILE.EMAIL} {user?.email}
      </AppText>

      <AppButton
        variant="error"
        title={STRINGS.PROFILE.LOGOUT_ACTION}
        onPress={logout}
      />
    </BaseScreen>
  );
}

export default ProfileScreen;
