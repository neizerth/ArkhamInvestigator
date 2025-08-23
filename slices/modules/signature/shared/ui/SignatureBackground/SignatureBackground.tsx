import type { BoxLayout } from "@shared/model";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import { SignatureImage, type SignatureImageProps } from "../signature-image";

export type SignatureBackgroundProps = SignatureImageProps & {
	layout: BoxLayout;
};

export const SignatureBackground: FC<SignatureBackgroundProps> = styled(
	SignatureImage,
).attrs({
	animated: true,
})`
  position: absolute;
  ${({ layout }: SignatureBackgroundProps) => css`
    left: ${-layout.left}px;
    top: ${-layout.top}px;
    width: ${layout.width}px;
    height: ${layout.height}px;
 `}
`;
