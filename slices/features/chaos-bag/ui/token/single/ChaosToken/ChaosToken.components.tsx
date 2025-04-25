import { Icon, type IconProps } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { ChaosTokenBackground } from "../ChaosTokenBackground";

type PropsWithSize = {
	size: number;
};

type ContainerProps = ViewProps & PropsWithSize;

export const Container: FC<ContainerProps> = styled(View)`

  position: relative;
  ${({ size }: ContainerProps) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size}px;
    overflow: hidden;
  `}
`;

const partStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Background: typeof ChaosTokenBackground = styled(
	ChaosTokenBackground,
)`
  ${partStyle};
  z-index: 1;
`;

type PartProps = IconProps &
	PropsWithSize & {
		color: string;
	};

export const Part: FC<PartProps> = styled(Icon)`
  ${partStyle};
  z-index: 2;
  ${({ size, color }: PartProps) => css`
    color: ${color};
    font-size: ${size}px;
    line-height: ${size}px;
  `}
`;
