import {
	Arkhamic,
	ArnoPro,
	Conkordia,
	STKaiti,
	STXinwei,
	SanCn,
	Yoon,
} from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
import { color, size } from "@shared/config";
import { Icon, type IconProps, Row, type UnscaledTextProps } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { GameText } from "../../../../../game-text";
import { phaseContentFontSize, phaseTitleFontSize } from "../../../config";
import {
	RoundReferenceBackground,
	type RoundReferenceBackgroundProps,
} from "../../RoundReferenceBackground";
import { RoundReferencePhaseStep } from "../../step";
import { RoundPhaseActions } from "../RoundPhaseActions";

type ContainerProps = ViewProps & {
	open?: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
	padding-bottom: 10px;
	${({ open }: ContentProps) =>
		open &&
		css`
		margin-bottom: -10px;
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

export const Header: typeof Row = styled(Row)`
	position: relative;
`;

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
	padding: 10px 15px 15px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
`;

type ToggleIconProps = IconProps & PropsWithOpen;

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon)`
	font-size: 10px;
	line-height: 10px;
	${({ open }: ToggleIconProps) => css`
		transform: rotate(${open ? "90deg" : "0deg"});
	`}
`;

type BackgroundProps = RoundReferenceBackgroundProps & PropsWithOpen;

export const Background: FC<BackgroundProps> = styled(RoundReferenceBackground)`
	top: 0;
	bottom: -5%;
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
			fontSize: phaseTitleFontSize,
			color: color.rulesText,
		},
		ru: {
			fontFamily: Conkordia.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
			paddingTop: 3,
		},
		zh: {
			fontFamily: STXinwei.regular,
		},
		"zh-cn": {
			fontFamily: STXinwei.regular,
		},
	},
});

export const Hint = withLocale({
	style: {
		default: {
			fontFamily: ArnoPro.italic,
			fontSize: phaseContentFontSize,
			color: color.rulesText,
			paddingHorizontal: 13,
			paddingBottom: 2,
		},
		ko: {
			fontFamily: Yoon.D330.italic,
		},
		zh: {
			fontFamily: STKaiti.italic,
		},
		"zh-cn": {
			fontFamily: STKaiti.italic,
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

export const Details: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;

export const Steps: typeof View = styled(View)`
	gap: ${size.gap.default}px;
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

export const Actions: typeof RoundPhaseActions = styled(RoundPhaseActions)`
	z-index: 2;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 35px;
`;
