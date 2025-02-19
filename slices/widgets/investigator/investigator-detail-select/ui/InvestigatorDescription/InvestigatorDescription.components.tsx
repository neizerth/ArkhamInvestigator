import { color } from "@shared/config";
import { Column, GameText, Row } from "@shared/ui";
import { Text } from "react-native";
import { Image as BaseImage } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex-grow: 1;
  gap: 10px;
`

export const Details: typeof Column = styled(Column)`
  gap: 10px;
`

export const Traits: typeof Text = styled(Text)`
  font-size: 14px;
  font-family: AlegreyaBold;
  color: ${color.light10};
`

export { Column as ImageContainer }

export const Image: typeof BaseImage = styled(BaseImage)`
  width: 100px;
  border-radius: 6px;
  aspect-ratio: 1;
`

export const InvestigatorText: typeof GameText = styled(GameText)`
  font-size: 14px;
  font-family: AlegreyaMedium;
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