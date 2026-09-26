import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { GameText } from "@modules/core/theme/shared/ui";
import { factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { Row } from "@shared/ui";
import { Image, type ImageProps } from "expo-image";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import type { ToastType } from "react-native-toast-message";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	type: ToastType;
};

export const Token: typeof ChaosToken = styled(ChaosToken)`

`;

export const Container = styled(View)<ContainerProps>`
  ${({ theme: { color, size } }) => css`
    max-width: 340px;
    min-height: 60px;
    width: 100%;
    justify-content: center;
    background-color: ${color.dark40};
    border-radius: ${size.borderRadius.default}px;
    padding: ${size.gap.small}px ${size.gap.default}px;
    border-width: 1px;
    border-left-width: ${size.gap.small}px;
  `}
  ${({ type, theme }) => {
		const borderColor: Record<ToastType, string> = {
			success: theme.color.skill.agility.dark,
			error: theme.color.skill.combat.dark,
			info: theme.color.status.info,
		};

		return css`
      border-color: ${borderColor[type]};
    `;
	}}
`;

export const Content: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
  flex: 1;
  align-items: center;
  padding: ${size.gap.small}px;
  gap: ${size.gap.default}px;
`}`;

export const Body: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const Images: typeof View = styled(View)`
  position: relative;
`;

type ImageWithFactionProps = ImageProps & Partial<PropsWithFaction>;

const factionBorderStyle = css<ImageWithFactionProps>`
   ${({ faction, theme }) => css`
    border: 1px solid ${faction ? factionColor[faction].border : theme.color.gray20};
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
  ${({ theme: { color, font, fontFamily } }) => css`
  color: ${color.light10};
  font-family: ${fontFamily.Alegreya.regular};
  font-size: ${font.size.small}px;
`}`;

export const Text1 = styled(Text)`
  
`;

export const Text2 = styled(Text)`
  
`;
