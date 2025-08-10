import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { MARINER, WHITE } from 'constants/colors';

type Props = {
  name: string;
  size?: number;
  color?: string;
  focused: boolean;
}

const AppIcon = ({
  name,
  size = 24,
  color = MARINER,
  focused,
}: Props) => <Icon name={name} size={size} color={focused ? color : WHITE}  />;

export default AppIcon;
