import { font, size } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${size.gap.default}px;
`;

export const Title: typeof Text = styled(Text)`
  font-size: ${font.size.medium}px;
`;
