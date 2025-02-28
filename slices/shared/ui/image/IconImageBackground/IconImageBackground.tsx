import { Image, type ImageProps } from 'react-native';
import { Container, Content, Group } from './IconImageBackground.components';
import type { PropsWithChildren } from 'react';

export type IconImageBackgroundProps = ImageProps & PropsWithChildren;

export const IconImageBackground = ({
  children,
  ...props
}: IconImageBackgroundProps) => {
  return (
    <Container>
      <Group>
        <Image 
          resizeMode="contain"
          {...props}
        />
        <Content>
          {children}
        </Content>
      </Group>
    </Container>
  );
}