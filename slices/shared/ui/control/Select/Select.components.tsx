import { size } from "@shared/config";
import { Row, UnscaledText } from "@shared/ui";
import styled from "styled-components/native";

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.default}px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText: typeof UnscaledText = styled(UnscaledText)`
  
`;
