import type { TouchableOpacityProps } from '@shared/ui/behavior';
import * as C from './IconButton.components';
import { Icon, type IconProps } from '@shared/ui/game';
import { Children } from 'react';

export type IconButtonProps = TouchableOpacityProps & {
  icon: string
  scaleType?: IconProps['scaleType']
  iconStyle?: IconProps['style']
}

export type DefinedIconButtonProps = Omit<IconButtonProps, 'icon'>;

export const IconButton = ({
  icon,
  scaleType,
  iconStyle,
  ...props
}: IconButtonProps) => {
  return (
    <C.Container {...props}>
      <Icon
        icon={icon}
        scaleType={scaleType}
        style={iconStyle}
      />
    </C.Container>
  );
}