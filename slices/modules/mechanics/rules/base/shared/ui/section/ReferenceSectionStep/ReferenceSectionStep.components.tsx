import { GameText, type GameTextProps } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { Icon, defaultGameTextComponentStyles } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import styled, { css } from "styled-components/native";
import { sectionContentFontSize } from "../../../config";
import { ReferenceSectionBackground } from "../ReferenceSectionBackground";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Touchable: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
  padding: 7px 12px;
	z-index: 2;
	flex: 0;
`;

export const Content: typeof View = styled(View)`
	flex-direction: row;
  justify-content: space-between;
  gap: ${size.gap.default}px;
  align-items: center;
	z-index: 2;
`;

export const Background: typeof ReferenceSectionBackground = styled(
	ReferenceSectionBackground,
).attrs({
	offsetX: "2.5%",
	rectWidth: "95%",
	height: "100%",
})`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
	opacity: 0.35;
`;

export const StepText: typeof GameText = styled(GameText)`
	
`;

type TextProps = GameTextProps & {
	last?: boolean;
};

export const Text: FC<TextProps> = styled(GameText).attrs(
	({ last }: TextProps) => ({
		contentContainerStyle: {
			flex: 1,
			alignItems: last ? "center" : "flex-start",
		},
		componentStyles: {
			...defaultGameTextComponentStyles,
			icon: {
				...defaultGameTextComponentStyles.icon,
				top: 1,
			},
		},
	}),
)`
	font-size: ${sectionContentFontSize}px;
`;

export const ToggleIcon: typeof Icon = styled(Icon)`
	font-size: 10px;
	line-height: 10px;
	color: ${color.title};
`;

type ToggleProps = ViewProps & {
	open?: boolean;
};
export const Toggle: FC<ToggleProps> = styled(View)`
	${({ open }: ToggleProps) => css`
		transform: rotate(${open ? "90deg" : "0deg"});
	`}
`;
