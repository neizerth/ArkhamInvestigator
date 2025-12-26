import { color, font } from "@shared/config";
import { Icon, Row, TextView } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  justify-content: center;
  position: relative;
`;

export const Text: typeof TextView = styled(TextView)`
  
`;

export const Expression: typeof Row = styled(Row)`
`;

export const OldValue: typeof TextView = styled(TextView)`
  color: ${color.dark20};
`;

export const Value: typeof TextView = styled(TextView)`
  color: ${color.text};
`;

export const Wrapper: typeof View = styled(View)`
  position: relative;
`;

export const Odds: typeof Text = styled(Text)`
  position: absolute;
  bottom: 17px;
  right: 0px;
  height: ${font.size.default}px;
  width: 35px;

  color: ${color.text};
  font-size: ${font.size.small}px;
  text-align: right;
`;

export const Greater: typeof TextView = styled(TextView)`
  color: #198754;
`;

export const Lower: typeof TextView = styled(TextView)`
  color: #dc3545;
`;

export const Stat: typeof Icon = styled(Icon)`
`;
