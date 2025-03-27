import { color, font } from "@shared/config";
import { type DefinedIconProps, Icon } from "@shared/ui/game";
import { Row } from "@shared/ui/grid";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../typography";

type ContainerElement = FC<ViewProps> & {
	Item: typeof Text;
};
export const Container: ContainerElement = styled(View)`
  
`;

export const ListItem: typeof View = styled(Row)`

`;

export const ListItemContent: typeof Text = styled(Text)`

`;

export const Item: typeof Text = styled(Text)`
`;

export const Marker: typeof View = styled(View)`
  align-items: center;
`;

export const Bullet: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "bullet",
})`
    font-size: ${font.size.small * 0.8}px;
    color: ${color.light10}
  `;
