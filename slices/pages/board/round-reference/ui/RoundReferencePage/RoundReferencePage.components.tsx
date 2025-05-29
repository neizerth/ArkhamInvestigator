import { color } from "@shared/config";
import { RoundReference } from "@widgets/game/round-reference";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${color.modal.background.light};
`;

export const Reference: typeof RoundReference = styled(RoundReference)`
  
`;
