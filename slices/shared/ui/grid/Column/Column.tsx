import type { PropsWithFill } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";


export type ColumnProps = ViewProps & PropsWithFill;

export const Column: FC<ColumnProps> = styled(View)`
  ${({ fill }: PropsWithFill) =>
		fill &&
		css`
    flex: 1
  `}
`;
