import { size } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: ${size.gap.default}px;
  gap: ${size.gap.medium}px;
`
