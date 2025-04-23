import { ArnoPro } from "@assets/fonts";
import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
import { color, font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { SkillCheckExpressionDisplay } from "@widgets/game/skill-check";
import { Image } from "expo-image";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Area: typeof Animated.View = styled(Animated.View)`
	position: absolute;
	z-index: 1;
	left: 0;
	width: 100%;
`;

export const Pressable: typeof TouchableOpacity = styled(TouchableOpacity)`
	padding: ${size.gap.default}px;
`;

export const Content: typeof Animated.View = styled(Animated.View)`
	padding: 5% 9% 6%;
	border-radius: ${size.borderRadius.default}px;
	position: relative;
	z-index: 1;
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
	gap: ${size.gap.default}px;
	flex-wrap: wrap;
`;

export const Item: typeof Row = styled(Row)`
  align-items: center;
`;

export const ItemContent: typeof Row = styled(Row)`
  align-items: center;
	gap: ${size.gap.small}px;
`;

export const Separator: typeof View = styled(View)`
  width: 1px;
	background-color: ${color.dark20};
	height: 20px;
`;

export const Title = withLocale({
	Component: TextView,
	style: {
		default: {
			color: color.text,
			fontFamily: ArnoPro.bold,
			fontSize: font.size.small,
		},
	},
});

export const Text = withLocale({
	Component: TextView,
	style: {
		default: {
			color: color.text,
			fontFamily: ArnoPro.regular,
			fontSize: font.size.small,
		},
	},
});

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
).attrs({
	expressionStyle: {
		gap: 2,
	},
	statStyle: {
		fontSize: font.size.small,
	},
	textStyle: {
		color: color.text,
		fontFamily: ArnoPro.regular,
		fontSize: 20,
		lineHeight: 20,
	},
})`
  
`;
