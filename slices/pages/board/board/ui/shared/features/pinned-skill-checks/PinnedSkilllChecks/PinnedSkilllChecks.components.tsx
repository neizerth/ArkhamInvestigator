import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity } from "@features/haptic";
import { color, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import { Image } from "expo-image";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { PinnedSkillCheckItem } from "../PinnedSkillCheckItem";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Area: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: absolute;
	padding: ${size.gap.default}px;
	z-index: 1;
	left: 0;
	width: 100%;
`;

export const Content: typeof View = styled(View)`
	padding: 3% 7% 4%;
	border-radius: ${size.borderRadius.default}px;
	position: relative;
	z-index: 1;
	min-height: 60px;
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

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: absolute;
	z-index: 10;
	right: 25px;
	top: 15px;
	width: 48px;
	height: 48px;
	justify-content: center;
	align-items: center;
`;

export const ToggleContent: typeof View = styled(View)`

`;

type ToggleIconProps = DefinedIconProps & {
	show?: boolean;
};

export const ToggleIcon: FC<ToggleIconProps> = styled(Icon).attrs(
	({ show }: ToggleIconProps) => ({
		icon: show ? "left-arrow" : "right-arrow",
	}),
)`
	color: ${color.dark10};
	opacity: 0.5;
`;

export const Item: typeof PinnedSkillCheckItem = styled(PinnedSkillCheckItem)`
	
`;
