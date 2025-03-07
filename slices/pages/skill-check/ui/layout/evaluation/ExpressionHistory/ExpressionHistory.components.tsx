import { color, size } from "@shared/config";
import { Copasetic } from "@shared/fonts/Copasetic";
import { Row } from "@shared/ui";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof ScrollView = styled(ScrollView)
  .attrs({
    contentContainerStyle: {
      gap: size.gap.small
    }
  })`
  `

export const Item: typeof Row = styled(Row)`
  justify-content: flex-end;
`

export const Value: typeof Text = styled(Text)`
  font-family: ${Copasetic.regular};
  justify-content: flex-end;
  font-size: 24px;
  color: ${color.dark10};
`