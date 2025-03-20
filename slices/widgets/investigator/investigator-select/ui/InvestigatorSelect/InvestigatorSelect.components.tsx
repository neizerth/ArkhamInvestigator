import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSelectFooter } from "../InvestigatorSelectFooter";

export const Container: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
`;

export const Separator: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
  text-align: center;
  font-size: ${font.size.large}px;
  color: ${color.light10};
  margin: 20px 0;
`;

export const Footer: typeof InvestigatorSelectFooter = styled(
	InvestigatorSelectFooter,
)`
  position: absolute;
  z-index: 1;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
`;
