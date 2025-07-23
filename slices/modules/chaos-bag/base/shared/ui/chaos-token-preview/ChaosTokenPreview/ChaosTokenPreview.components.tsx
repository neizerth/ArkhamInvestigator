import { Value, type ValueProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { chaosToken } from "../../../config";
import { ChaosToken } from "../../chaos-token";
import {
	ChaosTokenModification,
	type ChaosTokenModificationProps,
} from "../ChaosTokenModification";
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

type ModificationProps = ChaosTokenModificationProps & {
	padding: number;
};

const modificationRatio = 0.3;

export const Modification: FC<ModificationProps> = styled(
	ChaosTokenModification,
)`
  position: absolute;
  z-index: 3;

  ${({ size, padding }: ModificationProps) => {
		const mSize = size * modificationRatio;
		const top = (size - mSize) / 2 + padding;
		const left = -mSize * 0.18;
		return css`
      top: ${top}px;
      left: ${left}px;
      width: ${mSize}px;
      height: ${mSize}px;
    `;
	}}
`;

export const ModifiedHighlight: typeof View = styled(View)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
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
