import { ScenarioReference } from "@widgets/game/scenario-reference";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.4);
`;

export const Reference: typeof ScenarioReference = styled(ScenarioReference)`
  
`;
