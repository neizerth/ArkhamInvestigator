import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { ChaosTokenDetails } from "../ChaosTokenDetails";

export const Container: typeof Row = styled(Row)`
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
