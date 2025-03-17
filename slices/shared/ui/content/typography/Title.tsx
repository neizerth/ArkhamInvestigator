import { color, font, size } from "@shared/config";
import { Alegreya } from "@shared/fonts";
import styled from "styled-components/native";
import { AppText } from "../AppText";

export const Title: typeof AppText = styled(AppText)`
  font-family: ${Alegreya.medium};
  font-size: ${font.size.medium}px;
  margin: ${size.gap.default}px 0px;
  color: ${color.light10};
  text-align: center;
`