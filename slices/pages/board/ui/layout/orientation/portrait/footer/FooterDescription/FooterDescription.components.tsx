import { Pressable, ScrollView, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription } from "../../../../../shared/background";
import { DefinedIconButtonProps, IconButton, TouchableOpacity } from "@shared/ui";
import Animated from "react-native-reanimated";
import { TICK_PATTERN } from "@features/haptic";
import { InvestigatorTraits, InvestigatorText, InvestigatorTextProps, InvestigatorFlavor } from "@pages/board/ui/shared/text";
import { boardText } from "@pages/board/config";
import { DescriptionMenu } from "../DescriptionMenu";
import { FC } from "react";
import { color, size } from "@shared/config";

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
  bottom: 0;
` 

export const Expand: typeof Animated.View = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
` 

export const ExpandArea: typeof Pressable = styled(Pressable)
  .attrs({
    activeOpacity: 1
  })`
    z-index: 10;
  `

export const TextCollapse: typeof Pressable = styled(Pressable)`
  flex: 1;
`

export const Exit: FC<DefinedIconButtonProps> = styled(IconButton)
  .attrs({
    icon: 'resign',
    pressHapticPattern: TICK_PATTERN,
    iconStyle: {
      color: color.light10,
      fontSize: 36
    }
  })`
    position: absolute;
    left: 0px;
    top: -60px;
  `

export const Clear: FC<DefinedIconButtonProps> = styled(IconButton)
  .attrs({
    icon: 'repeat',
    iconStyle: {
      color: color.light10,
      fontSize: 36
    }
  })`
    position: absolute;
    right: 5px;
    top: -60px;
  `

export const TextContent: typeof ScrollView = styled(ScrollView)`
`

export const DescriptionContent: typeof View = styled(View)`
  flex: 1;
  justify-content: space-between;
`


export const Menu: typeof DescriptionMenu = styled(DescriptionMenu)`

`

export const Traits: typeof InvestigatorTraits = styled(InvestigatorTraits)`
  
`

export const Flavor: typeof InvestigatorFlavor = styled(InvestigatorFlavor)`
  
`

export const Text: typeof InvestigatorText = styled(InvestigatorText)`
  
`