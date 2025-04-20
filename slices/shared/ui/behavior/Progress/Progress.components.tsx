import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { color } from "../../../config";

export const Container: typeof View = styled(View)`
  width: 200px;
  height: 1px;
  background-color: ${color.dark30};
`;

type ValueProps = ViewProps & {
	value: number;
};

export const Value: FC<ValueProps> = styled(View)`
  flex: 1;
  background-color: ${color.white};

  ${({ value }: ValueProps) => css`
    width: ${value}%;
  `}
`;
