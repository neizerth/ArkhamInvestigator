import { color, font, size } from "@shared/config"
import { Alegreya } from "@shared/fonts"
import { AppText } from "@shared/ui"
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

export const Title: typeof AppText = styled(AppText)`
  font-family: ${Alegreya.medium};
  font-size: ${font.size.default}px;
  color: ${color.light10};

`

export const Value: typeof AppText = styled(AppText)`
  font-family: ${Alegreya.italic};
  font-size: ${font.size.default}px;
  color: ${color.light10};
`