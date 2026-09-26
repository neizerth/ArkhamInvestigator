import {
	ChaosToken,
	ChaosTokenCounter,
} from "@modules/chaos-bag/base/shared/ui";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.small}px;
`;

export const Counter = styled(ChaosTokenCounter)`
  
`;

export const Token = styled(ChaosToken)`
  
`;
