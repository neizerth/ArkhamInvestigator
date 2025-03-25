import { size } from "@shared/config";
import styled from "styled-components/native";
import { UnscaledText } from "../../behavior/UnscaledText";
import { Row } from "../../grid/Row";

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.default}px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText: typeof UnscaledText = styled(UnscaledText)`
  
`;
