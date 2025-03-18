import { UnscaledText, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";


export const Container: typeof View = styled(View)`
  
  flex: 1;
`

export const Item: typeof Row = styled(Row)`
  padding: 17px;
  justify-content: space-between;
  align-items: center;
`

export const ItemText: typeof UnscaledText = styled(UnscaledText)`
  
`