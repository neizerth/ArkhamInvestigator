import { TouchableOpacity } from "@modules/haptic/widgets";
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
		paddingHorizontal: 10,
	},
})`
  border-radius: 32px;
	padding: 5px 0;
`;

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
	position: relative;
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
  
`;
