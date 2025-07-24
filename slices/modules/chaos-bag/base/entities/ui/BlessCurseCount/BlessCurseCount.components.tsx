import { color, size } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { ChaosTokenCount } from "../ChaosTokenCount";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const Token: typeof ChaosTokenCount = styled(ChaosTokenCount)`
  
`;

export const Separator: typeof View = styled(View)`
  width: 1px;
  height: 30px;
  background-color: ${color.dark10};
  margin-left: ${size.gap.large}px;
  margin-right: ${size.gap.default}px;
`;
