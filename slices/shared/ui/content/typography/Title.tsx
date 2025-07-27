import { Alegreya } from "@assets/fonts";
import styled from "styled-components/native";
import { color, font, size } from "../../../config";
import {
	UnscaledText,
	type UnscaledTextProps,
} from "../../behavior/UnscaledText";

export type TitleProps = UnscaledTextProps;

export const Title: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Alegreya.medium};
  font-size: ${font.size.medium}px;
  margin: ${size.gap.default}px 0px;
  color: ${color.light10};
  text-align: center;
`;
