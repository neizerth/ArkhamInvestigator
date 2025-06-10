import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity } from "@modules/haptic/widgets";
import { color, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import { Image } from "expo-image";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
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
	padding: 7% 20px 9% 25px;
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
	top: -5%;
	bottom: -10%;
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
	right: 28px;
	top: 10px;
	width: 32px;
	height: 32px;
	border-radius: 32px;
	justify-content: center;
	align-items: center;
`;

export const ToggleContent: typeof View = styled(View)`

`;

export const ToggleIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "dismiss",
})`
	color: ${color.dark10};
	font-size: 16px;
	line-height: 16px;
	opacity: 0.8;
`;

export const Item: typeof PinnedSkillCheckItem = styled(PinnedSkillCheckItem)`
	
`;

export const ShowContainer: typeof View = styled(View)`
	position: absolute;
	z-index: 2;
	top: -5px;
	width: 100px;
	height: 48px;
	margin-left: -50px;
	left: 50%;
`;

export const ShowButton: typeof TouchableOpacity = styled(TouchableOpacity)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ShowIconContainer: typeof View = styled(View)`
	transform: rotate(90deg);
`;

export const ShowIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "pushpin",
})`
	color: ${color.white};
	opacity: 0.9;
	font-size: 18px;
	text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;
