import { Alegreya } from "@assets/fonts";
import { BoardSignatureImage } from "@modules/board/base/features/base/ui";
import { color, font } from "@shared/config";
import { Icon, type IconProps, Text, Value, type ValueProps } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { chaosToken } from "../../../config";
import { ChaosToken } from "../../chaos-token";
import { ChaosTokenModification } from "../ChaosTokenModification";
import { ChaosTokenPreviewValue } from "../ChaosTokenPreviewValue";
import { SealedImage } from "./images";

type PropsWithSize = {
	size: number;
};

type ContainerProps = ViewProps & {
	disabled?: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
  ${({ disabled }: ContainerProps) => css`
    opacity: ${disabled ? 0.5 : 1};
  `}
  position: relative;

  align-items: center;
  justify-content: center;
`;

export const Content: typeof View = styled(View)`
`;

type OverlayProps = ViewProps & PropsWithSize;

export const Layer: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

type CancelIconProps = IconProps &
	PropsWithSize & {
		byEffect?: boolean;
	};

export const CancelIcon: FC<CancelIconProps> = styled(Icon)`
  color: #fb423589;
  ${({ byEffect }: CancelIconProps) =>
		byEffect &&
		css`
    color: #66339992;
  `}
  ${({ size }: CancelIconProps) => css`
    font-size: ${size}px;
    line-height: ${size}px;
  `}
`;

type RemovedLayerProps = ViewProps & PropsWithSize;

export const RemovedLayer: FC<RemovedLayerProps> = styled(View)`
  position: absolute;
  z-index: 4;
  background-color: #FFFBF2;

  justify-content: center;
  align-items: center;
  

  ${({ size }: CancelIconProps) => css`
    width: ${size * 0.3}px;
    height: ${size * 0.3}px;
    border-radius: ${size * 0.3}px;
    left: ${size * 0.1}px;
    bottom: ${size * 0.1}px;
  `}
`;

type RemoveIconpProps = IconProps & PropsWithSize;

export const RemovedIcon: FC<RemoveIconpProps> = styled(Icon)`
  color: ${color.text};
  ${({ size }: CancelIconProps) => css`
    font-size: ${size * 0.2}px;
    line-height: ${size * 0.2}px;
  `}
`;

export const CancelLayer: typeof Layer = styled(Layer)`
  z-index: 3;
`;

export const OverlayLayer: typeof Layer = styled(Layer)`
  z-index: 4;
`;

export const Overlay: FC<OverlayProps> = styled(View)`
  ${({ size }: OverlayProps) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size}px;
  `}
  overflow: hidden;
  background-color: #d6cfb97a;
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
  z-index: 4;
`;

export const HighlightContainer: typeof View = styled(View)`
  position: absolute;
  z-index: 5;
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
  z-index: 5;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

type HighlightProps = ValueProps & PropsWithSize;

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

export const SealedCount: typeof View = styled(View)`
  position: absolute;
	z-index: 2;
  bottom: -3px;
  right: -3px;
	width: 18px;
	height: 18px;
	border-radius: 50%;
  background-color: #c12422;
  justify-content: center;
  align-items: center;
	padding: 1px;
`;

export const SealedCountText: typeof Text = styled(Text)`
	font-family: ${Alegreya.regular};
  color: ${color.light10};
  font-size: ${font.size.default}px;
	line-height: ${font.size.default}px;
	text-align: center;
`;

export const SealedTitle: typeof Text = styled(Text).attrs({
	numberOfLines: 1,
})`
  position: absolute;
  z-index: 3;
  bottom: -5px;
  padding: 0 3px;
	font-family: ${Alegreya.regular};
  background-color: #c12422;
  color: ${color.light10};
  font-size: 12px;
	line-height: ${font.size.default}px;
  border-radius: 20px;
  white-space: nowrap;
	text-align: center;
`;

export const SealedPreview: typeof View = styled(View)`
  position: absolute;
  z-index: 5;
  right: -5px;
  bottom: -5px;
`;

export const BoardPreview: typeof BoardSignatureImage = styled(
	BoardSignatureImage,
)`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid #c12422;
`;
