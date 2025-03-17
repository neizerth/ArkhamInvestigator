import { color, font, size } from "@shared/config";
import { Row as BaseRow, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { LanguagePicker } from "../LanguagePicker";
import { Alegreya } from "@shared/fonts"

export const Container: typeof View = styled(View)`
  background-color: ${color.dark40};
  flex: 1;
  align-items: center;
`

export const Content: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: ${size.gap.default}px;
`

export const Row: typeof BaseRow = styled(BaseRow)`
  flex-direction: row;
  align-items: center;
  padding: ${size.gap.default}px;
  margin-bottom: ${size.gap.default}px;
  gap: ${size.gap.default}px;
`

export const Label: typeof Text = styled(Text)`
  font-size: ${font.size.medium}px;
`

export const LanguageSelect: typeof LanguagePicker = styled(LanguagePicker)`
 
`