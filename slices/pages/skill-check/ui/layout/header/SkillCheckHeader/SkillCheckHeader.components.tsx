import { Image, View } from "react-native";
import styled from "styled-components/native";
import { rule } from './images';
import { Icon, IconButton, Row as BaseRow } from "@shared/ui";
import { skillCheckColor } from "@pages/skill-check/config";
import { color, font } from "@shared/config";

export const Container: typeof View = styled(View)`
  padding-top: 40px;
  align-items: center;
`

export const Rule: typeof Image = styled(Image)
  .attrs({
    source: rule,
    resizeMode: 'contain'
  })`
    margin-top: -22px;
    height: 40px;
    width: 280px;
  `

  export const Stat: typeof Icon = styled(Icon)`
    font-size: 20px;
    color: ${color.light15}
  `

export const Row: typeof BaseRow = styled(BaseRow)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const Button: typeof IconButton = styled(IconButton)
  .attrs({
    iconStyle: {
      color: color.light15,
      fontSize: 20
    }
  })`
    
  `