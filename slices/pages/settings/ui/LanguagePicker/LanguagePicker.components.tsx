import { size } from "@shared/config";
import { Row, UnscaledText } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  
  flex: 1;
`;

export const Item: typeof Row = styled(Row)`
  padding: ${size.gap.default}px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText: typeof UnscaledText = styled(UnscaledText)`
  
`;
