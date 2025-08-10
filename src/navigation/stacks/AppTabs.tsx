import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { STRINGS } from 'constants/strings';
import { MARINER, MIDNIGHT_VAULT, WHITE } from 'constants/colors';
import AppIcon from 'components/AppIcon';

// Screens
import HomeScreen from 'screens/Main/HomeScreen';
import ExchangeScreen from 'screens/Main/ExchangeScreen';
import ScannerScreen from 'screens/Main/ScannerScreen';
import ProfileScreen from 'screens/Main/ProfileScreen';

const AppTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarLabel: STRINGS.HOME.TAB_LABEL,
        tabBarInactiveTintColor: WHITE,
        tabBarIcon: ({ size, focused }) => (
          <AppIcon name="home" size={size} focused={focused} />
        ),
      },
    },
    Exchange: {
      screen: ExchangeScreen,
      options: {
        tabBarLabel: STRINGS.EXCHANGE.TAB_LABEL,
        tabBarInactiveTintColor: WHITE,
        tabBarIcon: ({ size, focused }) => (
          <AppIcon name="cash" size={size} focused={focused} />
        ),
      },
    },
    Scanner: {
      screen: ScannerScreen,
      options: {
        tabBarLabel: STRINGS.SCANNER.TAB_LABEL,
        tabBarInactiveTintColor: WHITE,
        tabBarIcon: ({ size, focused }) => (
          <AppIcon name="scan" size={size} focused={focused} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        tabBarLabel: STRINGS.PROFILE.TAB_LABEL,
        tabBarInactiveTintColor: WHITE,
        tabBarIcon: ({ size, focused }) => (
          <AppIcon name="person" size={size} focused={focused} />
        ),
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: MIDNIGHT_VAULT,
      borderTopColor: MARINER,
      borderTopWidth: 1,
    },
    tabBarActiveTintColor: MARINER,
  },
});

export const AppTabsNavigation = createStaticNavigation(AppTabs);
