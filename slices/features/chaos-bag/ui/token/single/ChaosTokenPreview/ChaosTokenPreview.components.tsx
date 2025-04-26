import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenMemo as ChaosToken } from "../ChaosToken/ChaosToken";

export const Container: typeof View = styled(View)`
  position: relative;
  padding: ${size.gap.small}px;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;
