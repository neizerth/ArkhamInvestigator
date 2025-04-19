import type { BoxLayout } from "@shared/model";
import { Image, type ImageProps } from "expo-image";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";

type PropsWithLayout = {
	layout: BoxLayout;
};

export type BackgroundProps = ImageProps & PropsWithLayout;

export const AnimatedContainer: typeof Animated.View = styled(Animated.View)`
  
`;

const layoutStyle = css<BackgroundProps>`
  ${({ layout }: BackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`;

type ContainerProps = ViewProps & PropsWithLayout;

export const Container: FC<ContainerProps> = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const GrayscaleContainer: typeof AnimatedContainer = styled(
	AnimatedContainer,
)`
  position: absolute;
  z-index: 2;
  flex: 1;
`;

export const Background: FC<BackgroundProps> = styled(Image)`
  z-index: 1;
  ${layoutStyle};
`;

export const GrayscaleBackground: typeof Background = styled(Background)`
`;
