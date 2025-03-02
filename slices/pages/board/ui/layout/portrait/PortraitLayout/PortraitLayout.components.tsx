import styled, { css } from "styled-components/native"
import { View } from "react-native"
import * as F from '../footer' 
import * as S from '../sidebar' 
import { size } from "@shared/config"
import { assetsSize, SIDEBAR_BOTTOM } from "@pages/board/config"
import { PropsWithView } from "@pages/board/model"
import { RuleSet } from "styled-components"
import { FC } from "react"
export const Container: typeof View = styled(View)`

`

export const Footer: typeof F.Footer = styled(F.Footer)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

type Sidebar<T> = FC<T & PropsWithView>;

const sidebarStyle = css<PropsWithView>`
  position: absolute;
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