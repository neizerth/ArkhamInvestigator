import { ChaosTokenMemo as ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { SealedImage } from "./images";

export const Container: typeof View = styled(View)`
  position: relative;

  align-items: center;
  justify-content: center;
`;

export const Content: typeof View = styled(View)`
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const Sealed: typeof SealedImage = styled(SealedImage).attrs({
	fill: "#c12422",
})`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
