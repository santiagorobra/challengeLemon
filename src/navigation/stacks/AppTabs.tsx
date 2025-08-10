import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { STRINGS } from 'constants/strings';
import { MARINER, MIDNIGHT_VAULT, WHITE } from 'constants/colors';
import AppIcon from 'components/AppIcon';
import HomeScreen from 'screens/Main/HomeScreen';
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
