import React, { useCallback } from 'react';

import BaseScreen from 'components/BaseScreen';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';
import { useGoogleAuth } from 'hooks/useGoogleAuth';
import { useSession } from 'hooks/useSession';

import styles from './styles';

function ProfileScreen() {
  const { signOut } = useGoogleAuth();
  const { user } = useSession();

  const logout = useCallback(() => {
    signOut();
    // TODO: Clear others states
  }, [signOut]);

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
