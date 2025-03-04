import { Pressable, ScrollView, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FactionDescription } from "../../../../background";
import { TouchableOpacity } from "@shared/ui";
import Animated from "react-native-reanimated";
import { TICK_PATTERN } from "@features/haptic";
import { InvestigatorTraits, InvestigatorText, InvestigatorTextProps, InvestigatorFlavor } from "@pages/board/ui/text";
import { boardText } from "@pages/board/config";
import { DescriptionMenu } from "../DescriptionMenu";

type PropsWithDisplay = {
  display: boolean;
}

export const Container: typeof View = styled(View)`
  position: relative;
 
`

export const Background: typeof FactionDescription = styled(FactionDescription)`
  flex: 1;
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
    activeOpacity: 1
  })`
  flex: 1;
`

export const TextCollapse: typeof Pressable = styled(Pressable)`
  flex: 1;
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