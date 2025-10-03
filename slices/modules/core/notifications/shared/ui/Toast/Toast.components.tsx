import { Alegreya } from "@assets/fonts";
import { color, factionColor, font, size } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { GameText } from "@shared/ui";
import { Row } from "@shared/ui";
import { Image, type ImageProps } from "expo-image";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import type { ToastType } from "react-native-toast-message";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	type: ToastType;
};

const boarderColor: Record<ToastType, string> = {
	success: color.skill.agility.dark,
	error: color.skill.combat.dark,
	info: color.status.info,
};

export const Container: FC<ContainerProps> = styled(View)`
  max-width: 340px;
  min-height: 60px;
  width: 100%;
  justify-content: center;
  background-color: ${color.dark40};
  border-radius: ${size.borderRadius.default}px;
  padding: ${size.gap.small}px ${size.gap.default}px;
  border-left-width: ${size.gap.small}px;
  ${({ type }: ContainerProps) => css`
    border-left-color: ${boarderColor[type]};
  `}
`;

export const Content: typeof Row = styled(Row)`
  flex: 1;
  align-items: center;
  padding: ${size.gap.small}px;
  gap: ${size.gap.default}px;
`;

export const Body: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const Images: typeof View = styled(View)`
  position: relative;
`;

type ImageWithFactionProps = ImageProps & Partial<PropsWithFaction>;

const factionBorderStyle = css<ImageWithFactionProps>`
   ${({ faction }: ImageWithFactionProps) => css`
    border: 1px solid ${faction ? factionColor[faction].border : color.gray20};
  `}
`;

export const SourceImage: FC<ImageWithFactionProps> = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  ${factionBorderStyle};
`;

export const TargetImage: FC<ImageWithFactionProps> = styled(Image)`
  position: absolute;
  bottom: -5px;
  right: -2px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  ${factionBorderStyle};
`;

export const Text: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		icon: {
			top: -2,
			lineHeight: 16,
		},
	},
})`
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.small}px;
`;

export const Text1 = styled(Text)`
  
`;

export const Text2 = styled(Text)`
  
`;
