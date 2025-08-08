import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import {
	ChaosTokenValue,
	type ChaosTokenValueProps,
} from "../../ChaosTokenValue";
import {
	type CreateChaosTokenIconHOCProps,
	AutoFail as Fail,
	AutoSuccessThin as Success,
} from "../../icons";

export const Container: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;

type PropsWithSize = {
	size: number;
};

type TokenValueProps = ChaosTokenValueProps & PropsWithSize;

export const Value: FC<TokenValueProps> = styled(ChaosTokenValue)`
  ${({ size }: TokenValueProps) => css`
    font-size: ${size * 0.7}px;
  `}
`;

type IconProps = PropsWithSize & CreateChaosTokenIconHOCProps;

export const AutoFail: FC<IconProps> = styled(Fail)`
  ${({ size }: IconProps) => css`
    font-size: ${size * 0.8}px;
    line-height: ${size * 0.8}px;
  `}
`;

export const AutoSuccess: FC<IconProps> = styled(Success)`
  ${({ size }: IconProps) => css`
    font-size: ${size * 1.3}px;
    line-height: ${size}px;
  `}
`;
