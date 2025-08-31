import { View } from "react-native";
import styled from "styled-components/native";
import { size } from "../../../config";
import { Text } from "../../content";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${size.gap.default}px;
`;

export const NumericProgress: typeof Text = styled(Text)`
`;
