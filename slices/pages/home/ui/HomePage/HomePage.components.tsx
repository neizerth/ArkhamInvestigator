import { statusBarHeight } from "@shared/config";
import { ImageBackground, UnscaledText } from "@shared/ui";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Button } from "../Button";
import { HomeMenu } from "../HomeMenu";
import { background } from "./images";

export const Container: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ResumeButton: typeof Button = styled(Button).attrs({
	size: "small",
	styleType: "transparent",
})`
    
  `;

export const Menu: typeof HomeMenu = styled(HomeMenu)`
  position: absolute;
  z-index: 1;
  top: ${statusBarHeight}px;
  left: 0;
  right: 0;
  flex: 1;
`;

type DisclaimerProps = ViewProps & {
	navbarHeight: number;
};

export const Disclaimer = styled(View)<DisclaimerProps>`
  ${({ theme: { size } }) => css`
    position: absolute;
    left: ${size.gap.large}px;
    right: ${size.gap.large}px;
  `}
  bottom: ${({ navbarHeight, theme }) => theme.size.gap.large + navbarHeight}px;
`;

export const DisclaimerText: typeof UnscaledText = styled(UnscaledText)`
  ${({ theme: { color, font, fontFamily } }) => css`
  color: ${color.dark10};
  font-family: ${fontFamily.Alegreya.regular};
  font-size: ${font.size.small}px;
`}`;

export const Background: typeof ImageBackground = styled(ImageBackground).attrs(
	{
		source: background,
		contentFit: "cover",
	},
)`
  position: absolute;
  opacity: 0.4;
  background-color: ${({ theme }) => theme.color.black};
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;
