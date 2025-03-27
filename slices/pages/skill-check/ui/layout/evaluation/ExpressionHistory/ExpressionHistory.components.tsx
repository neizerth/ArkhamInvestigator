import { size } from "@shared/config";
import { Row } from "@shared/ui";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		gap: size.gap.small,
	},
})`
    
  `;

export const Item: typeof Row = styled(Row)`
  justify-content: flex-end;
  align-items: stretch;
`;
