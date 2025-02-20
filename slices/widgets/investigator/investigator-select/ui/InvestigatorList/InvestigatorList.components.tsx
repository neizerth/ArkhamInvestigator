import styled from "styled-components/native";
import { size } from "@shared/config";
import { Row } from "@shared/ui";


export const Container: typeof Row = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
  gap: ${size.gap.default}px;
`
