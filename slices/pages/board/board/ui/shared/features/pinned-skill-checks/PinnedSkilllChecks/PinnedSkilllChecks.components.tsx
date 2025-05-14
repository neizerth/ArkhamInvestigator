import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity, type TouchableOpacityProps } from "@features/haptic";
import { color, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import { Image } from "expo-image";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { PINNED_CHECKS_MIN_HEIGHT } from "../../../../../config";
import { PinnedSkillCheckItem } from "../PinnedSkillCheckItem";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Area: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: absolute;
	padding: ${size.gap.default}px;
	z-index: 1;
	right: 0;
	width: 100%;
`;

export const Content: typeof View = styled(View)`
	padding: 3% 7% 4%;
	border-radius: ${size.borderRadius.default}px;
	position: relative;
	z-index: 1;
	min-height: ${PINNED_CHECKS_MIN_HEIGHT}px;
`;

export const Background: typeof Image = styled(Image).attrs({
	source: textureImages.paperTexture,
	contentFit: "fill",
})`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 10px;
	left: 10px;
`;

export const List: typeof Row = styled(Row)`
	align-items: center;
	flex-wrap: wrap;
`;

type ToggleProps = TouchableOpacityProps & {
	show?: boolean;
};

export const Toggle: FC<ToggleProps> = styled(TouchableOpacity)`
	position: absolute;
	z-index: 10;
	left: 25px;
	top: 15px;
	width: 48px;
	height: 48px;
	justify-content: center;
	align-items: center;

	${({ show }: ToggleProps) =>
		show &&
		css`
		left: auto;
		right: 25px;
	`}
`;

export const ToggleContent: typeof View = styled(View)`

`;

type ToggleIconProps = DefinedIconProps & {
	show?: boolean;
};

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon).attrs(
	({ show }: ToggleIconProps) => ({
		icon: show ? "right-arrow" : "left-arrow",
	}),
)`
	color: ${color.dark10};
	opacity: 0.5;
`;

export const Item: typeof PinnedSkillCheckItem = styled(PinnedSkillCheckItem)`
	
`;
