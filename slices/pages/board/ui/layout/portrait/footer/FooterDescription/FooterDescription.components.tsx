import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription } from "../../../../background";
import { TouchableOpacity } from "@shared/ui";
import Animated from "react-native-reanimated";
import { TICK_PATTERN } from "@features/haptic";
import { InvestigatorTraits, InvestigatorText } from "@pages/board/ui/text";

type PropsWithDisplay = {
  display: boolean;
}

export const Container: typeof View = styled(View)`
  position: relative;
 
`

export const Background: typeof FactionDescription = styled(FactionDescription)`

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

export const Traits: typeof InvestigatorTraits = styled(InvestigatorTraits)`
  text-align: center;
`

export const Text: typeof InvestigatorText = styled(InvestigatorText)`

`