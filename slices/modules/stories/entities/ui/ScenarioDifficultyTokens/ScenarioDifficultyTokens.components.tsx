import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  padding: ${size.gap.default}px ${size.gap.small}px;
  flex-wrap: wrap;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;
