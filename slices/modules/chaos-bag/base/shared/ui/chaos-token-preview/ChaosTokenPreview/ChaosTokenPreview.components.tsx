import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
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
		const left = -mSize * 0.2;
		return css`
      top: ${top}px;
      left: ${left}px;
      width: ${mSize}px;
      height: ${mSize}px;
    `;
	}}
`;
