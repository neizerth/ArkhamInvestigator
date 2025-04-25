import { color, size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosToken } from "../single/ChaosToken/ChaosToken";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.small}px 0px;
  border-top-width: 1px;
  border-top-color: ${color.dark20};
`;

export const Content: typeof View = styled(View)`
  padding: 0px ${size.gap.default}px;
`;

export const Item: typeof ChaosToken = styled(ChaosToken)`
  
`;
