import { Image, ImageProps } from 'react-native';
import { Container, Content } from './IconImageBackground.components';
import { PropsWithChildren } from 'react';

export type IconImageBackgroundProps = ImageProps & PropsWithChildren;

export const IconImageBackground = ({
  children,
  ...props
}: IconImageBackgroundProps) => {
  return (
    <Container>
      <Image 
        resizeMode="contain"
        {...props}
      />
      <Content>
        {children}
      </Content>
    </Container>
  );
}