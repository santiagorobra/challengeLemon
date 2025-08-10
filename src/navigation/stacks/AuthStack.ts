import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from 'screens/Auth/LoginScreen';

const AuthStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

export const AuthStackNavigation = createStaticNavigation(AuthStack);
