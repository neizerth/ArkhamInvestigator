import { color, font } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
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

export const PositionText: typeof Text = styled(Text)`
	font-size: ${font.size.small}px;
	line-height: ${font.size.small}px;
	color: ${color.text};
`;
