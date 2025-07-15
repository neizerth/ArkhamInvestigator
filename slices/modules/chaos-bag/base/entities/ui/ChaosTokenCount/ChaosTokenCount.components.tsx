import {
	ChaosToken,
	ChaosTokenCounter,
} from "@modules/chaos-bag/base/shared/ui";
import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  gap: ${size.gap.small}px;
`;

export const Counter = styled(ChaosTokenCounter)`
  
`;

export const Token = styled(ChaosToken)`
  
`;
