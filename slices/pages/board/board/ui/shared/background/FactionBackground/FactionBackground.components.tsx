import type { FC } from "react";
import { Image, type ImageProps } from "react-native";
import styled, { css } from "styled-components/native";
import type { PropsWithLayout } from "../../../../model";

type BackgroundProps = ImageProps &
	PropsWithLayout & {
		width?: number;
		height?: number;
	};

export const Background: FC<BackgroundProps> = styled(Image)`
  ${({ width = 0, height = 0, layout }: BackgroundProps) => css`
    width: ${width}px;
    height: ${height + layout.height / 2}px;
  `}
`;
