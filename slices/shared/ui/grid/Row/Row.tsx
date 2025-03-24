import { PropsWithFill } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

export type RowProps = ViewProps & PropsWithFill;

export const Row: FC<RowProps> = styled(View)`
  flex-direction: row;
  ${({ fill }: PropsWithFill) =>
		fill &&
		css`
    flex: 1
  `}
`;
