import type { FC } from "react";
import {
	View as BaseView,
	type ViewProps as BaseViewProps,
} from "react-native";
import styled, { css } from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";

type ViewProps = BaseViewProps & {
	vertical: boolean;
	size: number;
};

const View: FC<ViewProps> = styled(BaseView)`
  ${({ vertical }) => css`
    flex-direction: ${vertical ? "column" : "row"};
  `}
`;

export const Container: FC<ViewProps> = styled(View)`
  ${({ theme: { size } }) => css`
    padding: 0px ${size.gap.default}px;
  `}
`;

export const Content: FC<ViewProps> = styled(View)`
  ${({ theme: { color }, vertical, size }) => css`
    border: 1px solid ${color.dark10};

    ${vertical ? "width" : "height"}: ${size}px;
    border-radius: ${size}px;
  `}
  flex: 1;
`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  flex: 1;
`;
