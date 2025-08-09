import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

export type DotProps = ViewProps & {
	size?: number;
};

const DEFAULT_SIZE = 7;

export const Dot: typeof View = styled(View)`
  ${({ size = DEFAULT_SIZE }: DotProps) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size}px;
  `}
`;
