import { Row } from "@shared/ui";
import { Image as BaseImage, Text } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex-grow: 1;
`

export const Image: typeof BaseImage = styled(BaseImage)`
  width: 100px;
  aspect-ratio: 1;
`

export const InvestigatorText: typeof Text = styled(Text)`

`

export const MainInfo: typeof Row = styled(Row)`
  justify-content: space-between;
`