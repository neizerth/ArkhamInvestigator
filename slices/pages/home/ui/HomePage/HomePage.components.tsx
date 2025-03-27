import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { UnscaledText } from "@shared/ui";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button";
import { HomeMenu } from "../HomeMenu";

export const Container: typeof View = styled(View)`
  background-color: ${color.black};
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
  top: 40px;
  left: 0;
  right: 0;
  flex: 1;
`;

export const Disclaimer: typeof View = styled(View)`
  position: absolute;
  bottom: ${size.gap.large}px;
  left: ${size.gap.large}px;
  right: ${size.gap.large}px;
`;

export const DisclaimerText: typeof UnscaledText = styled(UnscaledText)`
  color: ${color.dark10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.small}px;
`;
