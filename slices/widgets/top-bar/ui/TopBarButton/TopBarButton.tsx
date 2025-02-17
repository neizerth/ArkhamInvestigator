import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Icon } from './TopBarButton.components';

export type TopBarButtonProps = TouchableOpacityProps & {
  icon?: string
}

export const TopBarButton = ({
  icon,
  children,
 ...props
}: TopBarButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      {icon && <Icon icon={icon}/>}
      {children}
    </TouchableOpacity>
  );
}