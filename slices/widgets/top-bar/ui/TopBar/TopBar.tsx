import { View, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { Container } from './TopBar.components';
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
    <Container {...props}>
      {onBack && (
        <TopBarButton 
          icon="arrow_back" 
          onPress={onBack}
        />
      )}
      {title && (
        <TopBarTitle>{title}</TopBarTitle>
      )}
      {children}
    </Container>
  )
}