import {
	Arkhamic,
	Conkordia,
	CrimsonPro,
	EBGaramond,
	FZLiBian,
	FangSong,
	SanCn,
	Yoon,
} from "@assets/fonts";
import { IconButton } from "@shared/ui";

import { withLocale } from "@modules/core/i18n/shared/lib";
import { GameText } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { Icon, type IconProps, Row, type UnscaledTextProps } from "@shared/ui";
import type { FC } from "react";
import { Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { phaseContentFontSize, phaseTitleFontSize } from "../../../config";

import {
	ReferenceSectionBackground,
	type ReferenceSectionBackgroundProps,
} from "@modules/mechanics/rules/base/shared/ui";
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
	align-items: center;
	padding-left: 10px;
	gap: 10px;
`;

const ios = Platform.OS === "ios";

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
	padding: 10px 15px 15px 0px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	${
		ios &&
		css`
		transform: translateY(5px);	
	`
	}
`;

export const PlayIcon: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 14,
		lineHeight: 14,
		color: color.title,
	},
})`
	padding: 5px;
`;

export const NoPlay: typeof View = styled(View)`
	width: 24px;
`;

type ToggleIconProps = IconProps & PropsWithOpen;

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon)`
	font-size: 10px;
	line-height: 10px;
	color: ${color.title};
	${({ open }: ToggleIconProps) => css`
		transform: rotate(${open ? "90deg" : "0deg"});
	`}
	${
		ios &&
		css`
		transform: translateY(-2px);
	`
	}
`;

type BackgroundProps = ReferenceSectionBackgroundProps & PropsWithOpen;

export const Background: FC<BackgroundProps> = styled(
	ReferenceSectionBackground,
)`
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	opacity: 0.6;
	position: absolute;
`;

export const PhaseBackground: typeof Background = styled(Background).attrs({
	height: 52,
})`
	
`;

const zhTitleConfig = {
	fontFamily: FZLiBian.regular,
	transform: [
		{
			translateY: -phaseTitleFontSize * 0.2,
		},
	],
};

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
		zh: zhTitleConfig,
		"zh-cn": zhTitleConfig,
	},
});

export const Hint = withLocale({
	style: {
		default: {
			fontFamily: CrimsonPro.italic,
			fontSize: phaseContentFontSize,
			color: color.rulesText,
			paddingHorizontal: 13,
			paddingBottom: 2,
		},
		ru: {
			fontFamily: EBGaramond.italic,
		},
		ko: {
			fontFamily: Yoon.D330.italic,
		},
		zh: {
			fontFamily: FangSong.italic,
		},
		"zh-cn": {
			fontFamily: FangSong.italic,
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

export const StepButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
	z-index: 2;
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
