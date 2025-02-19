import { color, size } from "@shared/config";
import { IconNumber, Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
  background-color: ${color.dark20};
  padding: ${size.gap.small}px;
  border-radius: ${size.borderRadius.default}px;
`

export const Value: typeof IconNumber = styled(IconNumber)`
  color: white;
`