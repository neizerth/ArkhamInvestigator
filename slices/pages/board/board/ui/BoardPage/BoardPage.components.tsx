import { color, statusBarHeight } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { BoardHeader, type BoardHeaderProps } from "../layout";
import {
	PortraitLayout as BasePortraitLayout,
	type PortraitLayoutProps as BasePortraitLayoutProps,
} from "../layout";
import { InvestigatorBackground } from "../layout/investigator-background/InvestigatorBackground";

export const Container: typeof View = styled(View)`
  flex: 1;
  position: relative;
  background-color: ${color.dark30};
`;

export const Background: typeof InvestigatorBackground = styled(
	InvestigatorBackground,
)`
  position: absolute;
  flex: 1;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

type HeaderProps = BoardHeaderProps & {
	descriptionShown: boolean;
};

export const Header: FC<HeaderProps> = styled(BoardHeader)`
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  top: ${statusBarHeight}px;
  ${({ descriptionShown }: HeaderProps) => css`
    z-index: ${descriptionShown ? 2 : 3};
  `}
`;

export const PortraitLayout: FC<BasePortraitLayoutProps> = styled(
	BasePortraitLayout,
)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;
