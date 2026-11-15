import type { AppTheme } from "@shared/model";
import { Row } from "@shared/ui";
import type { FC } from "react";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { FACTION_SELECT_ITEM_SIZE } from "../../config";

type ContainerProps = ViewProps & {
	replaceSignature: boolean;
};

const getPadding = (theme: AppTheme) => {
	const { size, safeAreaInsets, orientation } = theme;

	const left = orientation.landscape
		? safeAreaInsets.left + size.gap.default * 2 + FACTION_SELECT_ITEM_SIZE
		: size.gap.default;

	const right = orientation.landscape
		? size.gap.small + safeAreaInsets.right
		: size.gap.default + safeAreaInsets.right;

	const bottom = 0;
	const top = size.gap.default;

	return `${top}px ${right}px ${bottom}px ${left}px`;
};

export const Container: FC<ContainerProps> = styled(Row)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: space-between;
    padding: ${getPadding(theme)};
    gap: ${theme.size.gap.medium}px;
  `}
  ${({ replaceSignature }: ContainerProps) =>
		replaceSignature &&
		css`
      justify-content: flex-end;
    `}
`;
