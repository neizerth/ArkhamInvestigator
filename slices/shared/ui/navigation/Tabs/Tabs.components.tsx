import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import type { FC } from "react";
import type { TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { color, font, size } from "../../../config";
import { Text } from "../../content";
import { Row } from "../../grid";

export const Container: typeof Row = styled(Row)`
	border-radius: ${size.borderRadius.default}px ${size.borderRadius.default}px 0 0;
	overflow: hidden;
`;

type PropsWithSelected = {
	selected: boolean;
};

type TabProps = TouchableOpacityProps & PropsWithSelected;

export const Tab: FC<TabProps> = styled(TouchableOpacity)`
	flex: 1;
  padding: ${size.gap.small}px;
	align-items: center;
	background-color: ${color.dark20};
	border-bottom-width: 1px;
	border-bottom-color: ${color.dark20};

	${({ selected }: PropsWithSelected) =>
		selected &&
		css`
		border-bottom-color: ${color.white};
	`}
`;

type TabTitleProps = TextProps & PropsWithSelected;

export const TabTitle: FC<TabTitleProps> = styled(Text)`
  font-size: ${font.size.small}px;
`;
