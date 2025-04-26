import { Row } from "@shared/ui";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ChaosTokenDetailsMemo as ChaosTokenDetails } from "../ChaosTokenDetails";

export const Container: typeof FlatList = styled(FlatList)`
  
`;

export const Item: typeof ChaosTokenDetails = styled(ChaosTokenDetails)`
  
`;

export const BlessCurse: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const Token: typeof ChaosTokenDetails = styled(ChaosTokenDetails).attrs({
	inputStyle: {
		alignItems: "center",
		justifyContent: "center",
	},
})`
  flex: 1;
  align-items: center;
`;
