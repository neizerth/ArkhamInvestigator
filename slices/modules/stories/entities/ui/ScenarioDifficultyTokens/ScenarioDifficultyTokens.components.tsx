import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { Row } from "@shared/ui";
import styled, { css } from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
  gap: ${size.gap.default}px;
  padding: ${size.gap.default}px ${size.gap.small}px;
  flex-wrap: wrap;
`}`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;
