import React from 'react';
import { TouchableOpacity } from 'react-native';

import AppIcon from 'components/AppIcon';
import { MARINER } from 'constants/colors';

type Props = {
  onPress: () => void;
  name: string;
  size?: number;
  color?: string;
};

const AppButtonIcon: React.FC<Props> = ({
  onPress,
  name,
  size = 24,
  color = MARINER,
}) => (
  <TouchableOpacity onPress={onPress}>
    <AppIcon name={name} color={color} size={size} focused={true} />
  </TouchableOpacity>
);

export default AppButtonIcon;
