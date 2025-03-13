import type { ViewProps } from 'react-native';
import * as C from './TopBar.components';
import { TopBarButton } from '../TopBarButton';
import { TopBarTitle } from '../TopBarTitle';

export type TopBarProps = ViewProps & {
  onBack?: () => void
  title?: string
}

export const TopBar = ({
  onBack,
  title,
  children,
  ...props
}: TopBarProps) => {
  return (
    <C.Container {...props}>
      {onBack && (
        <TopBarButton 
          icon="arrow_back" 
          onPress={onBack}
        />
      )}
      {title && (
        <C.Title>{title}</C.Title>
      )}
      {children}
    </C.Container>
  )
}