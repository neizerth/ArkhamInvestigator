import { size } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { LayoutContainer } from "../../LayoutContainer";
import { ExpressionHistory } from "../ExpressionHistory";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px;
  padding-bottom: ${size.gap.large}px;
  align-items: center;
  gap: ${size.gap.large}px;
  padding: ${size.gap.default}px ${size.gap.large}px;
`;

export const Content: typeof LayoutContainer = styled(LayoutContainer)`
  flex: 1;
  padding: 0 ${size.gap.large}px;
`;

export const Current: typeof View = styled(View)`
  
`;

export const History: typeof ExpressionHistory = styled(ExpressionHistory)`
  flex: 1;
`;
