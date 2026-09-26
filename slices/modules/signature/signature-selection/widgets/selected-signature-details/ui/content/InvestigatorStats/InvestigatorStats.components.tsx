import { HealthValue, SanityValue } from "@modules/board/base/entities/base/ui";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.small}px;
`;

export const Health: typeof HealthValue = styled(HealthValue)`
  
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;
