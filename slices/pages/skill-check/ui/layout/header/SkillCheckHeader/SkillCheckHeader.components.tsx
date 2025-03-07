import { Image, View } from "react-native";
import styled from "styled-components/native";
import { rule } from './images';
import { Icon, IconButton, Row as BaseRow } from "@shared/ui";
import { skillCheckColor } from "@pages/skill-check/config";
import { color, font, size } from "@shared/config";

export const Container: typeof View = styled(View)`;
  padding: 40px ${size.gap.default}px 0;
`

export const Content: typeof View = styled(View)`
  align-items: center;
  position: relative;
`

export const Controls: typeof View = styled(View)`
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 2;
`


export const CheckIcon: typeof View = styled(View)`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 5px;
  align-items: center;
`

export const Rule: typeof Image = styled(Image)
  .attrs({
    source: rule,
    resizeMode: 'contain'
  })`
    margin-top: -15px;
    height: 40px;
  `

  export const Stat: typeof Icon = styled(Icon)`
    font-size: 30px;
    color: rgb(213 177 87);
  `

export const Row: typeof BaseRow = styled(BaseRow)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const HistoryActions: typeof BaseRow = styled(BaseRow)`
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