import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
import { color } from "@shared/config";
import { Icon, type IconProps, type UnscaledTextProps } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { GameText } from "../../../../game-text";
import { RoundReferencePhaseStep } from "../step";
import {
	RoundReferencePhaseBackground,
	type RoundReferencePhaseBackgroundProps,
} from "./RoundReferencePhaseBackground";

type ContainerProps = ViewProps & {
	open?: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
	padding-bottom: 10px;
	${({ open }: ContentProps) =>
		open &&
		css`
		margin-bottom: -20px;
	`}
`;

export const Wrapper: typeof View = styled(View)`
	position: relative;
`;

type PropsWithOpen = {
	open?: boolean;
};

type ContentProps = ViewProps & PropsWithOpen;

export const Content: FC<ContentProps> = styled(View)`
	position: relative;
	padding: 0 10px 0px;
	gap: 10px;
	z-index: 1;
	${({ open }: ContentProps) =>
		open &&
		css`
		padding-bottom: 40px;
	`}
`;

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px 10px;
`;

type ToggleIconProps = IconProps & PropsWithOpen;

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon)`
	font-size: 10px;
	line-height: 10px;
	${({ open }: ToggleIconProps) => css`
		transform: rotate(${open ? "90deg" : "0deg"});
	`}
`;

type BackgroundProps = RoundReferencePhaseBackgroundProps & PropsWithOpen;

export const Background: FC<BackgroundProps> = styled(
	RoundReferencePhaseBackground,
)`
	top: 0;
	bottom: -3%;
	left: 0;
	right: 0;
	opacity: 0.6;
	position: absolute;
	${({ open }: BackgroundProps) =>
		open &&
		css`
		top: -3%;
		bottom: -3%;
	`}
`;

export const BaseTitle = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			fontSize: 16,
			color: color.rulesText,
		},
		ru: {
			fontFamily: Conkordia.regular,
			fontSize: 17,
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

type TitleProps = UnscaledTextProps & PropsWithOpen;

export const Title: FC<TitleProps> = styled(BaseTitle)`
	${({ open }: TitleProps) =>
		open &&
		css`
		color: ${color.title};
	`}
`;

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
