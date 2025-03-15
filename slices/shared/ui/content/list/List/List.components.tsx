import { View, ViewProps } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../typography";
import { FC } from "react";
import { size } from "@shared/config";
import { ListMarker } from "../ListMarker";
import { Row } from "@shared/ui/grid";
import { Alegreya } from "@shared/fonts";

type ContainerElement = FC<ViewProps> & {
  Item: typeof Text

}
export const Container: ContainerElement = styled(View)`
  
`

export const ItemContainer: typeof View = styled(Row)`
  gap: ${size.gap.default}px;
`

export const Item: typeof Text = styled(Text)`
`


export const Marker: typeof ListMarker = styled(ListMarker)`
  font-family: ${Alegreya.bold};
`
