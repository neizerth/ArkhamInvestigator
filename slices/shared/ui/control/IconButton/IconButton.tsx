import { TouchableOpacityProps } from '@shared/ui/behavior';
import * as C from './IconButton.components';
import { Icon, IconProps } from '@shared/ui/game';

export type IconButtonProps = TouchableOpacityProps & {
  icon: string
  scaleType?: IconProps['scaleType']
  iconStyle?: IconProps['style']
}

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