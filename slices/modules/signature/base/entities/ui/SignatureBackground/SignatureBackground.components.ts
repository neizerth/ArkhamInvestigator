import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { SignatureImage } from "../signature-image";

const screen = Dimensions.get("screen");

export const Background: typeof SignatureImage = styled(SignatureImage)`
  position: absolute;
  top:0;
  left: 0px;
  width: ${screen.width}px;
  height: ${screen.height}px;
`;
