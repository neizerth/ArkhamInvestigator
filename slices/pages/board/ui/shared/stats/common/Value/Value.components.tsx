import { IconNumber } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs({
	stroke: true,
})`
    color: white;
  `;
