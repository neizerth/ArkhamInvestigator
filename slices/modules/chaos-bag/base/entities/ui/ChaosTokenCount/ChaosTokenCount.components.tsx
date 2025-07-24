import {
	ChaosToken,
	ChaosTokenCounter,
} from "@modules/chaos-bag/base/shared/ui";
import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container = styled(Row)`
  gap: ${size.gap.small}px;
`;

export const Counter = styled(ChaosTokenCounter)`
  
`;

export const Token = styled(ChaosToken)`
  
`;
