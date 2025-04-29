import { color, font } from "@shared/config";
import { Text } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import type { TextProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "../../../../haptic";
import { ChaosTokenPreview } from "../../token";
export const Container: typeof View = styled(View)`
	height: 64px;
	padding-bottom: 5px;
`;

export const List: typeof FlatList = styled(FlatList).attrs({
	contentContainerStyle: {
		paddingHorizontal: 10,
	},
})`
  border-radius: 32px;
	padding: 5px 0;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
`;

export const Position: typeof View = styled(View)`
	position: absolute;
	z-index: 1;
	top: -2px;
	right: 7px;
	width: 15px;
	height: 15px;
	border-radius: 25px;
	border: 1px solid ${color.light10}; 
	background-color: ${color.light10};
	justify-content: center;
	align-items: center;
`;

const positionFontSize: Record<number, number> = {
	1: font.size.small,
	2: font.size.xs * 0.9,
};

const positionLineHeight: Record<number, number> = {
	1: font.size.small,
	2: font.size.xs * 1.05,
};

type PositionTextProps = TextProps & {
	size: number;
};

export const PositionText: FC<PositionTextProps> = styled(Text)`
	${({ size }: PositionTextProps) => css`
		font-size: ${positionFontSize[size]}px;
		line-height: ${positionLineHeight[size]}px;
	`}
	
	color: ${color.text};
`;
