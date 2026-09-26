import type { FC } from "react";
import styled, { type DefaultTheme } from "styled-components/native";
import { skillCheckColor } from "../../../../../../../config";
import {
	ExpressionHistoryItemAction as Action,
	type ExpressionHistoryItemActionProps as ActionProps,
} from "../../ExpressionHistoryItemAction";

type PinnedActionProps = Omit<ActionProps, "icon"> & {
	pinned?: boolean;
};

export const Container: FC<PinnedActionProps> = styled(Action).attrs(
	({ pinned, theme }: PinnedActionProps & { theme: DefaultTheme }) => ({
		iconStyle: {
			color: pinned ? skillCheckColor.checkIcon : theme.color.light10,
		},
		icon: "pushpin",
	}),
)`
`;
