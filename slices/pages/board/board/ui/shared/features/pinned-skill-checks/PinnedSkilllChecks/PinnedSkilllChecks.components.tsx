import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity } from "@features/haptic";
import { color, size } from "@shared/config";
import { type DefinedIconProps, Icon, ImageBackground, Row } from "@shared/ui";
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
	padding: ${size.gap.medium}px 25px ${size.gap.medium}px;
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

export const ToggleIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "dismiss",
})`
	color: ${color.dark10};
	opacity: 0.5;
`;

export const Item: typeof PinnedSkillCheckItem = styled(PinnedSkillCheckItem)`
	
`;

export const ShowContainer: typeof ImageBackground = styled(
	ImageBackground,
).attrs({
	source: textureImages.paperRipTexture,
	contentFit: "fill",
})`
	position: absolute;
	z-index: 2;
	top: -10px;
	width: 60px;
	height: 48px;
	margin-left: -30px;
	left: 50%;
	opacity: 0.7;
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
	icon: "right-arrow",
})`
	color: ${color.dark10};
	opacity: 0.7;
`;
