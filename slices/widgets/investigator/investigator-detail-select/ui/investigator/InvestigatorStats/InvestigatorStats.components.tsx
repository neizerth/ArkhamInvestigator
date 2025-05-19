import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { HealthValue, SanityValue } from "../../../../value";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
`;

export const Health: typeof HealthValue = styled(HealthValue)`
  
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;
