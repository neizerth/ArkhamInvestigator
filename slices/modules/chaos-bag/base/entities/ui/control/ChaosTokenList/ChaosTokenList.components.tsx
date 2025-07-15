import { color } from "@shared/config";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { BlessCurseControl } from "../BlessCurseControl";
import { ChaosTokenDetailsMemo as ChaosTokenDetails } from "../ChaosTokenDetails";

export const Container: typeof FlatList = styled(FlatList)`
  
`;

export const Item: typeof ChaosTokenDetails = styled(ChaosTokenDetails)`
  border-top-width: 1px;
  border-top-color: ${color.dark20};
`;

export const BlessCurse: typeof BlessCurseControl = styled(BlessCurseControl)`
	border-top-width: 1px;
  border-top-color: ${color.dark20};
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
