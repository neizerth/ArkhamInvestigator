import type { FC } from "react";
import FastImage, { type FastImageProps } from "react-native-fast-image";
import styled, { css } from "styled-components/native";
import type { PropsWithLayout } from "../../../../model";

type BackgroundProps = FastImageProps &
	PropsWithLayout & {
		width?: number;
		height?: number;
	};

export const Background: FC<BackgroundProps> = styled(FastImage)`
  ${({ width = 0, height = 0, layout }: BackgroundProps) => css`
    width: ${width}px;
    height: ${height + layout.height / 2}px;
  `}
`;
