import styled from "styled-components/native"
import { View } from "react-native"
import * as F from '../footer' 
import * as S from '../sidebar' 
import { size } from "@shared/config"
import { assetsSize, SIDEBAR_BOTTOM } from "@pages/board/config"
export const Container: typeof View = styled(View)`

`

export const Footer: typeof F.Footer = styled(F.Footer)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

export const RightSidebar: typeof S.RightSidebar = styled(S.RightSidebar)`
  position: absolute;
  right: ${size.gap.default}px;
  width: ${assetsSize.main}px;
  top: 0;
  bottom: ${SIDEBAR_BOTTOM}px;
`

export const LeftSidebar: typeof S.LeftSidebar = styled(S.LeftSidebar)`
  position: absolute;
  left: ${size.gap.small}px;
  width: ${assetsSize.main}px;
  top: 0;
  bottom: ${SIDEBAR_BOTTOM}px;
`