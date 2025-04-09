import type { BoxLayout } from "@shared/model";
import type { FC } from "react";
import { View } from "react-native";
import { Image, type ImageProps } from "react-native";
import type { ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import type { HeaderLayout } from "../../../../model";

type BackgroundProps = ImageProps & {
	layout: BoxLayout;
};

export const Background: FC<BackgroundProps> = styled(Image)`
  position: absolute;
  ${({ layout }: BackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`;

type BackgroundContainerProps = ViewProps & {
	layout: HeaderLayout;
};

export const Container: FC<BackgroundContainerProps> = styled(View)`
  overflow: hidden;
`;

export const Content: FC<ViewProps> = styled(Animated.View)`
  flex: 1;
`;
