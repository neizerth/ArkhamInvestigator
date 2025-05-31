import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenList } from "../token";

export const Container: typeof View = styled(View)`
  gap: ${size.gap.small}px;
`;

export const List: typeof ChaosTokenList = styled(ChaosTokenList)`
  
`;
