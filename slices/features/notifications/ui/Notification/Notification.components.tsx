import { color, size } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  background-color: ${color.light10};
  padding: ${size.gap.default}px;
  border-radius: ${size.borderRadius.default}px;
  align-items: center;
  justify-content: space-between;
`;

export const Title: typeof Text = styled(Text)`
  color: ${color.text};
`;

export const Close: typeof Icon = styled(Icon)`
  color: ${color.text};
  font-size: 18px;
  line-height: 18px;
`;
