import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
import { color, size } from "@shared/config";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { GameText } from "../../../../game-text";
import { RoundReferencePhaseStep } from "../RoundReferencePhaseStep";
import {
	RoundReferencePhaseBackground,
	type RoundReferencePhaseBackgroundProps,
} from "./RoundReferencePhaseBackground";

export const Container: typeof View = styled(View)`
	position: relative;
`;

type PropsWithOpen = {
	open?: boolean;
};

type ContentProps = ViewProps & PropsWithOpen;

export const Content: FC<ContentProps> = styled(View)`
	position: relative;
	padding: ${size.gap.small}px 10px;
	gap: 20px;
	z-index: 1;
	${({ open }: ContentProps) =>
		open &&
		css`
		padding-bottom: 40px;
	`}
`;

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
`;

type BackgroundProps = RoundReferencePhaseBackgroundProps & PropsWithOpen;

export const Background: FC<BackgroundProps> = styled(
	RoundReferencePhaseBackground,
)`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: 0.6;
	position: absolute;
	${({ open }: BackgroundProps) =>
		open &&
		css`
		top: -3%;
		bottom: -15%;
	`}
`;

export const Title = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			fontSize: 16,
			color: color.rulesText,
		},
		ru: {
			fontFamily: Conkordia.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
		},
		zh: {
			fontFamily: STXinwei.regular,
		},
		"zh-cn": {
			fontFamily: STXinwei.regular,
		},
	},
});

export const Steps: typeof View = styled(View)`
	gap: 10px;
`;

export const Step: typeof View = styled(View)`
	position: relative;
`;

export const StepContent: typeof RoundReferencePhaseStep = styled(
	RoundReferencePhaseStep,
)`

`;

export const StepBackground: typeof Background = styled(Background).attrs({
	offsetX: "2.5%",
	rectWidth: "95%",
})`
	opacity: 0.35;
`;

export const StepText: typeof GameText = styled(GameText)`
	
`;
