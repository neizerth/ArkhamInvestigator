import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription, type FactionDescriptionProps } from "../../../../background";
import type { FC } from "react";
import type { PropsWithView } from "@pages/board/model";
import { descriptionSize, PORTRAIT_DESCRIPTION_HEIGHT } from "@pages/board/config";
import { TouchableOpacity } from "@shared/ui";
import Animated from "react-native-reanimated";
import { TICK_PATTERN } from "@features/haptic";

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

export const Content: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
` 

export const Expand: typeof Animated.View = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
` 

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)
  .attrs({
    activeOpacity: 1,
    pressHapticPattern: TICK_PATTERN
  })`
  flex: 1;
`