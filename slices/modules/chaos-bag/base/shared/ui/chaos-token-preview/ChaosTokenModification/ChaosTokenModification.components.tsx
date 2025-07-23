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
};

export const Background: FC<BackgroundProps> = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid #D6CFB9;
  ${({ value }: BackgroundProps) => css`
    background-color: ${getChaosTokenModificationColor(value)};
  `}
  transform: rotate(45deg);
`;

type TokenValueProps = ValueProps & {
	size: number;
};

export const TokenValue: FC<TokenValueProps> = styled(Value)`
  /* font-size: 38px; */
  ${({ size }: TokenValueProps) => css`
    font-size: ${size * 0.25}px;
  `}
  position: relative;
  z-index: 2;
`;
