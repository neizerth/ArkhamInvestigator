import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { ExpressionHistory } from "../ExpressionHistory";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px;
  padding-bottom: ${size.gap.large}px;
  justify-content: space-between;
  gap: ${size.gap.default}px;
`

export const Current: typeof View = styled(View)`
  
`

export const History: typeof ExpressionHistory = styled(ExpressionHistory)`
  flex: 1;
`