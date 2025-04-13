import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`

`;

export const Header: typeof Row = styled(Row)`
  justify-content: space-between;

  border: 1px solid transparent;
  border-left-width: 0px;
  border-bottom-color: ${color.dark10};

  margin-bottom: ${size.gap.default}px;
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
  font-size: ${font.size.default}px;

`;

export const Value: typeof Text = styled(Text)`
  font-family: ${Alegreya.italic};
  font-size: ${font.size.default}px;
`;
