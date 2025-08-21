import type { BoxLayout } from "@shared/model";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import {
	AnimatedSignatureImage,
	type AnimatedSignatureImageProps,
} from "../AnimatedSignatureImage";

export type SignatureBackgroundProps = AnimatedSignatureImageProps & {
	layout: BoxLayout;
};

export const SignatureBackground: FC<SignatureBackgroundProps> = styled(
	AnimatedSignatureImage,
)`
  position: absolute;
  ${({ layout }: SignatureBackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`;
