import {
	selectIsSkillCheckHistoryItemPinned as selectIsPinned,
	useAppSelector,
} from "@shared/lib";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./PinAction.components";

export type PinActionProps = ActionProps & {
	itemId: string;
};

export const PinAction = ({ itemId, ...props }: PinActionProps) => {
	const pinned = useAppSelector(selectIsPinned(itemId));
	return <C.Container {...props} pinned={pinned} />;
};
