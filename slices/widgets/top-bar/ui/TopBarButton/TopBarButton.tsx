import type { TouchableOpacityProps } from 'react-native';
import { Container, Icon } from './TopBarButton.components';

export type TopBarButtonProps = TouchableOpacityProps & {
  icon?: string
}

export const TopBarButton = ({
  icon,
  children,
 ...props
}: TopBarButtonProps) => {
  return (
    <Container {...props}>
      {icon && <Icon icon={icon}/>}
      {children}
    </Container>
  );
}