import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components";
import { GameText } from "../../../../game-text";

export const Container: typeof Row = styled(View)`
  padding: 7px 12px;
`;

export const Text: typeof GameText = styled(GameText)`
  
`;

export const End: typeof Row = styled(Row)`
	justify-content: center;
`;
