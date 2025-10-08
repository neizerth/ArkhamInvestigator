import { Arkhamic } from "@assets/fonts";
import {
	Pressable,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { withIcon } from "@shared/lib/hoc";
import {
	type DefinedIconProps,
	Icon,
	ImageBackground,
	type ImageBackgroundProps,
	Row,
	UnscaledText,
} from "@shared/ui";
import type { FC } from "react";
import { type ImageProps, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Background: FC<ImageBackgroundProps> = styled(ImageBackground)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Title: typeof Row = styled(Row)`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Id: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Arkhamic.regular};
  padding-top: 1%;
`;

export const TitleText: typeof UnscaledText = styled(UnscaledText)`
  
`;

export const Unique = withIcon("unique");

export const Subtitle: typeof View = styled(View)`
  align-items: center;
`;

export const SubtitleText: typeof UnscaledText = styled(UnscaledText)`
  
`;

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Content: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  z-index: 1;
`;

type ArrowProps = DefinedIconProps & {
	parallel?: boolean;
};

export const Arrow: FC<ArrowProps> = styled(Icon).attrs({
	icon: "left-arrow",
})`
  font-size: 16px;
  line-height: 16px;
  ${({ parallel }: ArrowProps) => css`
    color: ${parallel ? color.white : color.dark20};
  `}
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
`;

type LeftProps = TouchableOpacityProps & {
	compact?: boolean;
};

export const Activation: typeof Pressable = styled(Pressable)`
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

export const Left: FC<LeftProps> = styled(TouchableOpacity)`
  align-items: center;
  background: transparent;
  z-index: 4;
  width: 48px;
  padding: 5px 3px 5px 5px;
  ${({ compact }: LeftProps) => css`
    align-items: ${compact ? "flex-end" : "center"};
  `}
`;

export const Right: typeof Left = styled(Left)`
  ${({ compact }: LeftProps) => css`
    align-items: ${compact ? "flex-start" : "center"};
  `}
`;

export const RightArrow: typeof View = styled(View)`
  transform: rotate(180deg);
`;

export const TitleContainer: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const TitleContent: typeof TouchableOpacity = styled(TouchableOpacity)`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
  height: 100%;
`;
