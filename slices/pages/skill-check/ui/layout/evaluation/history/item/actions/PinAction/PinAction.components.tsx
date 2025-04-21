import { color } from "@shared/config";
import type { FC } from "react";
import styled from "styled-components/native";
import { skillCheckColor } from "../../../../../../../config";
import {
	ExpressionHistoryItemAction as Action,
	type ExpressionHistoryItemActionProps as ActionProps,
} from "../../ExpressionHistoryItemAction";

type PinnedActionProps = ActionProps & {
	pinned?: boolean;
};

export const Container: FC<PinnedActionProps> = styled(Action).attrs(
	({ pinned }: PinnedActionProps) => ({
		iconStyle: {
			color: pinned ? skillCheckColor.checkIcon : color.light10,
		},
	}),
)`
`;
