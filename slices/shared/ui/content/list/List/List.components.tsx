import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../typography";
import type { FC } from "react";
import { color, font, size } from "@shared/config";
import { ListMarker } from "../ListMarker";
import { Row } from "@shared/ui/grid";
import { Alegreya } from "@shared/fonts";
import { type DefinedIconProps, Icon } from "@shared/ui/game";

type ContainerElement = FC<ViewProps> & {
  Item: typeof Text

}
export const Container: ContainerElement = styled(View)`
  
`

export const ListItem: typeof View = styled(Row)`

`

export const ListItemContent: typeof Text = styled(Text)`

`

export const Item: typeof Text = styled(Text)`
`


export const Marker: typeof View = styled(View)`
  padding-top: ${font.size.small * 0.35}px;
  align-items: center;
`

export const Bullet: FC<DefinedIconProps> = styled(Icon)
  .attrs({
    icon: 'bullet'
  })`
    font-size: ${font.size.small * 0.5}px;
    color: ${color.light10}
  `
