import { Icon, type IconProps } from "@shared/ui";
import type { FC } from "react";
import { Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { chaosToken } from "../../../config";
import {
	ChaosTokenBackground,
	type ChaosTokenBackgroundProps,
} from "../ChaosTokenBackground";

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
  `}
`;

const partStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type BackgroundProps = ChaosTokenBackgroundProps & PropsWithSize;

export const Background: FC<BackgroundProps> = styled(ChaosTokenBackground)`
  ${partStyle};
  z-index: 1;
  overflow: hidden;
  ${({ size }: PartProps) => css`
    border-radius: ${size}px;
  `}
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
    border-radius: ${size}px;
  `}
`;

type SelectionProps = ViewProps & PropsWithSize;

const ios = Platform.OS === "ios";

export const Selection: FC<SelectionProps> = styled(View)`
  ${partStyle};
  z-index: 2;
  border: 2px solid ${chaosToken.color.selected};
  ${({ size }: SelectionProps) => css`
    border-radius: ${size}px;
  `}
  ${!ios && `filter: drop-shadow(0px 0px 5px ${chaosToken.color.selected})`}
`;
