import { color, size } from "@shared/config";
import { Copasetic } from "@shared/fonts"
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
  align-items: stretch;
`
