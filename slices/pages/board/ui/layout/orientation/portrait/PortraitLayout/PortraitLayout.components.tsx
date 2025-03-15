import styled, { css } from "styled-components/native"
import { Pressable, View } from "react-native"
import * as F from '../footer' 
import * as S from '../sidebar' 
import { size } from "@shared/config"
import { assetsSize, SIDEBAR_BOTTOM } from "@pages/board/config"
import type { PropsWithView } from "@pages/board/model"
import { RuleSet } from "styled-components"
import type { FC } from "react"
import Animated from "react-native-reanimated"

export const Container: typeof View = styled(View)`
  position: relative;
`

export const Overlay: typeof Animated.View = styled(Animated.View)`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

export const OverlayArea: typeof Pressable = styled(Pressable)`
  
`

export const Footer: typeof F.Footer = styled(F.Footer)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
`

type Sidebar<T> = FC<T & PropsWithView>;

const sidebarStyle = css<PropsWithView>`
  position: absolute;
  z-index: 1;
  top: 0;
  ${({ view }: PropsWithView) => {
    const { height } = view;
    const bottom = height < 700 ? 160 : 200;

    return css`
      bottom: ${bottom}px;
    `
  }}
`

export const RightSidebar: Sidebar<S.RightSidebarProps> = styled(S.RightSidebar)`
  ${sidebarStyle}
  right: ${size.gap.default}px;
`

export const LeftSidebar: Sidebar<S.LeftSidebarProps> = styled(S.LeftSidebar)`
  ${sidebarStyle}
  left: ${size.gap.default}px;
`
