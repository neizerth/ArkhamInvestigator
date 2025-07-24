import { Value, type ValueProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { css } from "styled-components/native";
import { getChaosTokenModificationColor } from "./ChaosTokenModification.styles";

export const Container: typeof View = styled(View)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

type BackgroundProps = {
	value: number;
	sealedBorder?: boolean;
	sealed?: boolean;
	showBorder?: boolean;
};

export const Background: FC<BackgroundProps> = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* border-color: 1px solid #D6CFB9; */
  ${({ value }: BackgroundProps) => css`
    background-color: ${getChaosTokenModificationColor(value)};
  `}
   ${({ sealed, sealedBorder, showBorder }: BackgroundProps) =>
			showBorder &&
			sealed &&
			sealedBorder &&
			css`
    border-bottom-left-radius: 2px;
    border-bottom-width: 2px;
    border-left-width: 2px;
    border-bottom-color: #c12422;
    border-left-color: #c12422;
  `}
   ${({ showBorder, sealed }: BackgroundProps) =>
			showBorder &&
			!sealed &&
			css`
        border-color: #D6CFB9;
        border-bottom-width: 1px;
        border-left-width: 1px;
      `}
   
  transform: rotate(45deg);
`;

type TokenValueProps = ValueProps & {
	size: number;
};

export const Content: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const TokenValue: FC<TokenValueProps> = styled(Value)`
  ${({ size }: TokenValueProps) => css`
    font-size: ${size * 0.25}px;
  `}
`;
