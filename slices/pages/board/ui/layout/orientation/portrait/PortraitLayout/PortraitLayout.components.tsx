import type { PropsWithView } from "@pages/board/model";
import { size } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { Overlay as BaseOverlay } from "../Overlay";
import * as F from "../footer";
import * as S from "../sidebar";

export const Overlay: typeof BaseOverlay = styled(BaseOverlay)`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Footer: typeof F.Footer = styled(F.Footer)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
`;

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
    `;
	}}
`;

export const RightSidebar: Sidebar<S.RightSidebarProps> = styled(
	S.RightSidebar,
)`
  ${sidebarStyle}
  right: ${size.gap.default}px;
`;

export const LeftSidebar: Sidebar<S.LeftSidebarProps> = styled(S.LeftSidebar)`
  ${sidebarStyle}
  left: ${size.gap.default}px;
`;
