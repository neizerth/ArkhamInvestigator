import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: ${size.gap.default}px;
  gap: ${size.gap.medium}px;
`
