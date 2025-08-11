import React, { JSX } from 'react';

import { useSession } from 'hooks/useSession';

import { AuthStackNavigation } from './stacks/AuthStack';
import { AppTabsNavigation } from './stacks/AppTabs';

function Navigation(): JSX.Element {
  const { isAuthenticated } = useSession();

  return isAuthenticated ? <AppTabsNavigation /> : <AuthStackNavigation />;
}

export default Navigation;
