import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import type { FC } from "react";
import type { TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Text } from "../../content";
import { Row } from "../../grid";

export const Container: typeof Row = styled(Row)`
	border-radius: ${({ theme: { size } }) =>
		`${size.borderRadius.default}px ${size.borderRadius.default}px 0 0`};
	overflow: hidden;
`;

type PropsWithSelected = {
	selected: boolean;
};

type TabProps = TouchableOpacityProps & PropsWithSelected;

export const Tab: FC<TabProps> = styled(TouchableOpacity)`
	flex: 1;
	align-items: center;
	border-bottom-width: 1px;
	${({ theme: { size, color } }) => css`
		padding: ${size.gap.small}px;
		background-color: ${color.dark20};
		border-bottom-color: ${color.dark20};
	`}

	${({ selected, theme }) =>
		selected &&
		css`
		border-bottom-color: ${theme.color.white};
	`}
`;

type TabTitleProps = TextProps & PropsWithSelected;

export const TabTitle: FC<TabTitleProps> = styled(Text)`
  font-size: ${({ theme }) => theme.font.size.small}px;
`;
