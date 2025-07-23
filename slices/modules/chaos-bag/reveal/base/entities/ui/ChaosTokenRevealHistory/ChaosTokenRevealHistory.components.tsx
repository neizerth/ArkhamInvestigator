import { TouchableOpacity } from "@modules/core/haptic/shared/ui";
import { size } from "@shared/config";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ChaosBagRevealedToken } from "../ChaosBagRevealedToken";
export const Container: typeof View = styled(View)`
	height: 64px;
	padding-bottom: 5px;
`;

export const List: typeof FlatList = styled(FlatList).attrs({
	contentContainerStyle: {
		paddingHorizontal: size.gap.default,
		gap: size.gap.small,
	},
})`
  border-radius: 32px;
	padding: ${size.gap.small}px 0;
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
  
`;
