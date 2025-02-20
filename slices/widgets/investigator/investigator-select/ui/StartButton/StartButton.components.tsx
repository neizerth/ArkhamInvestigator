import { color, size } from "@shared/config";
import { Alegreya } from "@shared/fonts/Alegreya";
import { Icon as BaseIcon, Row } from "@shared/ui";
import { TouchableOpacity, Text as BaseText, Image } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px ${size.gap.medium}px;
  border-radius: 25px;
  background-color: ${color.light10};
`

export const Content: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
  gap: ${size.gap.medium}px;
`

export const InvestigatorImage: typeof Image = styled(Image)`
  width: 30px;
  aspect-ratio: 1;
  border-radius: ${size.borderRadius.default}px;
`

export const Investigators: typeof Row = styled(Row)`
  justify-content: space-between;
  gap: ${size.gap.small}px;
`

export const Text: typeof BaseText = styled(BaseText)`
  font-size: 18px;
  color: ${color.black};
  text-align: right;
  font-family: ${Alegreya.regular};
`

export const Icon: typeof BaseIcon = styled(BaseIcon)
  .attrs({
    icon: 'right-arrow'
  })`
    font-size: 18px
  `