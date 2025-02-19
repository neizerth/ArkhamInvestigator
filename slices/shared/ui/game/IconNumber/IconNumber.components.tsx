import styled, { css } from "styled-components/native";
import { Icon, type IconProps } from "../Icon/Icon";
import type { FC } from "react";

export type PropsWithSize = {
  size: number
}

export const Char: FC<IconProps & PropsWithSize> = styled(Icon)`
  ${({ size }: PropsWithSize) => css`
    letter-spacing: ${size * 0.1}px;
  `}
`

export type PredefinedIcon = Omit<IconProps, 'icon'>;

export const Sign: typeof Char = styled(Char)`
  position: relative;
  ${({ size }: PropsWithSize) => css`
    font-size: ${size * 0.1}px;
    top: -${size * 0.4}px;
  `}
`