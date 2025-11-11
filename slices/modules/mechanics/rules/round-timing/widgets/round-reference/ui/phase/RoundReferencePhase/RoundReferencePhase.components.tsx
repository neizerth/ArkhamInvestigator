import { CrimsonPro, EBGaramond, FangSong, Yoon } from "@assets/fonts";
import { IconButton } from "@shared/ui";

import { withLocale } from "@modules/core/i18n/shared/lib";
import { color, size } from "@shared/config";
import { Icon, type IconProps } from "@shared/ui";
import type { FC } from "react";
import { Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { phaseContentFontSize } from "../../../config";

import {
	ReferenceSectionBackground,
	type ReferenceSectionBackgroundProps,
	ReferenceSectionHeader,
	ReferenceSectionStep,
} from "@modules/mechanics/rules/base/shared/ui";
import { RoundReferenceStepContent } from "../../step";
import { RoundPhaseActions } from "../RoundPhaseActions";

const ios = Platform.OS === "ios";

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

export const Header: typeof ReferenceSectionHeader = styled(
	ReferenceSectionHeader,
)`

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
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	opacity: 0.6;
	position: absolute;
`;

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

export const Details: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;

export const Steps: typeof View = styled(View)`
	gap: ${size.gap.default}px;
`;

export const Step: typeof ReferenceSectionStep = styled(ReferenceSectionStep)`
`;

export const StepContent: typeof RoundReferenceStepContent = styled(
	RoundReferenceStepContent,
)`
`;

export const Actions: typeof RoundPhaseActions = styled(RoundPhaseActions)`
	z-index: 2;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 35px;
`;
