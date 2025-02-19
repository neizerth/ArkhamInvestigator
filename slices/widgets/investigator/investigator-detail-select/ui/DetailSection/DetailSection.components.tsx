import { color, font, size } from "@shared/config"
import { View, Text } from "react-native"
import styled from "styled-components/native"

export const Container: typeof View = styled(View)`

`

export const Header: typeof View = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  border: 1px solid transparent;
  border-bottom-color: ${color.dark10};

  margin-bottom: ${size.gap.default}px;
`

export const Title: typeof Text = styled(Text)`
  font-family: AlegreyaMedium;
  font-size: ${font.size.default};
  color: ${color.light10};

`

export const Value: typeof Text = styled(Text)`
  font-family: AlegreyaItalic;
  font-size: ${font.size.default};
  color: ${color.light10};
`