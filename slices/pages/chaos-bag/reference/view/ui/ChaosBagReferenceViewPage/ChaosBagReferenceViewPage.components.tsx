import { Pressable } from "@features/haptic";
import { size } from "@shared/config";
import { ScenarioReference } from "@widgets/game/reference";
import { View } from "react-native";
import styled from "styled-components/native";
import { ReferenceMenu } from "../ReferenceMenu";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
`;

export const Content: typeof View = styled(View)`
  justify-content: center;
  align-items: stretch;
  gap: ${size.gap.default}px;
`;

export const Reference: typeof ScenarioReference = styled(ScenarioReference)`
  
`;

export const ReferenceContainer: typeof Pressable = styled(Pressable)`
  
`;

export const Menu: typeof ReferenceMenu = styled(ReferenceMenu)`
`;
