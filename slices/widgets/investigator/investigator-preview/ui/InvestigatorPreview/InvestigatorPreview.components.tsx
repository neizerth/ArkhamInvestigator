import type { Faction } from "@shared/model";
import type { FC } from "react";

import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

import { ArkhamDigits } from "@assets/fonts";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, factionColor, size } from "@shared/config";
import type { PropsWithFaction } from "@shared/model/ui";
import { Icon, UnscaledText } from "@shared/ui";
import Color from "color";
import { Image, type ImageProps } from "expo-image";

const getSelectionColor = (faction: Faction) => {
	const color = factionColor[faction].darkColor;

	return Color(color).alpha(0.3).string();
};

export const Selection: FC<ViewProps & PropsWithFaction> = styled(View)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ faction }: PropsWithFaction) => css`
    border: 5px solid ${factionColor[faction].border};
    background-color: ${getSelectionColor(faction)};
  `}
`;

export const DisabledOverlay: typeof View = styled(View)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
`;

type PictureProps = ImageProps & {
	size: number;
	grayscale?: boolean;
};

export const Picture: FC<PictureProps> = styled(Image).attrs({
	contentFit: "cover",
})`
    ${({ size }: PictureProps) => css`
      aspect-ratio: 1;
      width: ${size}px;
      height: ${size}px;
    `}
    ${({ grayscale }: PictureProps) =>
			grayscale &&
			css`
      filter: grayscale(1);
    `}
  `;

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Info: typeof View = styled(View)`
  position: absolute;
  flex-direction: row;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 ${size.borderRadius.large}px 0 0;
  padding: 2px 8px;
  padding-top: 2px;
`;

export const SelectedCount: typeof View = styled(View)`
  position: absolute;
  flex-direction: row;
  z-index: 1;
  bottom: 10px;
  right: 8px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${color.light10};
  border-radius: ${size.borderRadius.large}px;
  padding: 4px;
`;

export const Count: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${ArkhamDigits.fill};
  font-size: 12px;
`;

export const ExtraIcon: typeof Icon = styled(Icon)`
  font-size: 22px;
  text-align: center;
  color: ${color.white}
`;
