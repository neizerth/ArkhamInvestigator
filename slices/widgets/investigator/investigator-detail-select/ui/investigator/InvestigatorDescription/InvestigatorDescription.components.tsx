import { color, font, size } from "@shared/config";
import { AppText, Column, Row } from "@shared/ui";
import { Text } from "react-native";
import { Image as BaseImage } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSkills } from "../InvestigatorSkills";
import { GameText } from "@widgets/game-text";
import { Alegreya } from "@shared/fonts"
import { InvestigatorStats } from "../InvestigatorStats";

export const Container: typeof View = styled(View)`
  flex-grow: 1;
  gap: ${size.gap.default}px;
`

export const Details: typeof Column = styled(Column)`
  gap: ${size.gap.default}px;
`

export const Traits: typeof AppText = styled(AppText)`
  font-size: ${font.size.default}px;
  font-family: ${Alegreya.bold};
  color: ${color.light10};
`

export { Column as ImageContainer }
export { InvestigatorSkills as Skills }

export const Image: typeof BaseImage = styled(BaseImage)`
  width: 100px;
  border-radius: ${size.borderRadius.default}px;
  aspect-ratio: 1;
`

export const InvestigatorText: typeof GameText = styled(GameText)`
  font-size: ${font.size.default}px;
  font-family: ${Alegreya.medium};
  color: ${color.light10};
`

export const InvestigatorTextContainer: typeof View = styled(View)`
  padding: 2px 0px 2px 6px;
  border-left-width: 2px;
  border-left-color: ${color.dark10};
`

export const MainInfo: typeof Row = styled(Row)`
  justify-content: space-between;
`

export const Stats: typeof InvestigatorStats = styled(InvestigatorStats)`
  
`