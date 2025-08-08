import { Value, type ValueProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { chaosToken } from "../../../config";
import { ChaosToken } from "../../chaos-token";
import { ChaosTokenModification } from "../ChaosTokenModification";
import { ChaosTokenPreviewValue } from "../ChaosTokenPreviewValue";
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

export const Modification: typeof ChaosTokenModification = styled(
	ChaosTokenModification,
)`
  position: absolute;
  z-index: 3;
`;

export const HighlightContainer: typeof View = styled(View)`
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const TokenValue: typeof ChaosTokenPreviewValue = styled(
	ChaosTokenPreviewValue,
)`
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

type HighlightProps = ValueProps & {
	size: number;
};

export const Highlight: FC<HighlightProps> = styled(Value).attrs({
	stroke: false,
	textStyle: {
		color: chaosToken.color.default,
	},
})`
  ${({ size }: HighlightProps) => css`
    font-size: ${size * 0.43}px;
  `}
`;
