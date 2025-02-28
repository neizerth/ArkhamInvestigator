import { Animated, View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription, FactionDescriptionProps } from "../../background";
import { FC } from "react";
import { PropsWithView } from "@pages/board/model";
import { descriptionSize } from "@pages/board/config";
import { TouchableOpacity } from "@shared/ui";

type PropsWithDisplay = {
  display: boolean;
}

export const Container: typeof View = styled(View)`
  position: relative;
 
`

type BackgroundProps = FactionDescriptionProps & PropsWithView;

export const Background: FC<BackgroundProps> = styled(FactionDescription)`
  ${({ view }: PropsWithView) => css`
    width: ${view.width}px;
    height: ${view.width / descriptionSize.ratio}px;
  `}
`


type ContentProps = ViewProps & PropsWithView & PropsWithDisplay;

export const Content: FC<ContentProps> = styled(Animated.View)`
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  ${({ display, view }: ContentProps) => display && css`
    top: ${60 - view.width / descriptionSize.ratio}px;
  `}
` 

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
`