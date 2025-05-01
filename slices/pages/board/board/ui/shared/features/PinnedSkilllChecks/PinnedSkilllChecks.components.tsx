import { ArnoPro, STXinwei, SanCn, Yoon } from "@assets/fonts";
import { textureImages } from "@assets/images/game/effects/textures";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
import { color, font, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row, TextView } from "@shared/ui";
import { SkillCheckExpressionDisplay } from "@widgets/game/skill-check";
import { Image } from "expo-image";
import type { FC } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Area: typeof Animated.View = styled(Animated.View)`
	position: absolute;
	padding: ${size.gap.default}px;
	z-index: 1;
	left: 0;
	width: 100%;
`;

export const Pressable: typeof TouchableOpacity = styled(TouchableOpacity)`
	padding: ${size.gap.default}px;
`;

export const Content: typeof Animated.View = styled(Animated.View)`
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

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
	flex-direction: row;
	padding: ${size.gap.default}px;
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

const zhTitleTextConfig = {
	fontFamily: STXinwei.regular,
};

const titleTextStyle = {
	default: {
		color: color.text,
		fontFamily: ArnoPro.bold,
		fontSize: font.size.default,
	},
	ko: {
		fontFamily: SanCn.bold,
	},
	zh: zhTitleTextConfig,
	"zh-cn": zhTitleTextConfig,
};

export const Title = withLocale({
	Component: TextView,
	style: titleTextStyle,
});

const zhTextConfig = {
	fontFamily: STXinwei.regular,
};

const textStyle = {
	default: {
		color: color.text,
		fontFamily: ArnoPro.regular,
		fontSize: font.size.default,
	},
	ko: {
		fontFamily: Yoon.D330.regular,
	},
	zh: zhTextConfig,
	"zh-cn": zhTextConfig,
};

export const Text = withLocale({
	Component: TextView,
	style: textStyle,
});

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
)`
  
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
`;
