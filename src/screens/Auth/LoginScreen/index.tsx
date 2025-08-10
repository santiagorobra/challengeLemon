import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useGoogleAuth } from 'hooks/useGoogleAuth';
import AppText from 'components/AppText';
import { STRINGS } from 'constants/strings';

import styles from './styles';

function LoginScreen() {
  const { GoogleSigninButton, loading, error, signIn } = useGoogleAuth();

  return (
    <View style={styles.container}>
      <AppText style={styles.title} colorType="success" variant="title">
        {STRINGS.LOGIN.CHALLENGE_TITLE} {`:)`}
      </AppText>
      <AppText style={styles.title} colorType="primary" variant="title">
        {STRINGS.LOGIN.TITLE}
      </AppText>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <GoogleSigninButton color="dark" onPress={signIn} />
      )}
      {error ? (
        <AppText style={styles.error} colorType="error">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

export default LoginScreen;
