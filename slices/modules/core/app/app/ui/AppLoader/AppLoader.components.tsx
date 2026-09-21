import { color, font, size } from "@shared/config";
import { Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const ErrorContainer: typeof View = styled(View)`
  align-items: center;
  gap: ${size.gap.default}px;
  padding: 0 ${size.gap.large}px;
`;

export const ErrorText: typeof Text = styled(Text)`
  text-align: center;
  color: ${color.light10};
  font-size: ${font.size.small}px;
`;
