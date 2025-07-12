import { memo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ExpressionHistoryItemRightActions.components";

export type ExpressionHistoryItemRightActionsProps = ViewProps & {
	itemId: string;
	onPin?: () => void;
	onRenameStart?: () => void;
	onRemove?: () => void;
};

export const ExpressionHistoryItemRightActions = ({
	itemId,
	onRenameStart,
	...props
}: ExpressionHistoryItemRightActionsProps) => {
	return (
		<C.Container {...props}>
			<C.Separator />
			<C.Remove itemId={itemId} />
			<C.Separator />
			<C.SetName itemId={itemId} onPress={onRenameStart} />
			<C.Separator />
			<C.Pin itemId={itemId} />
		</C.Container>
	);
};

export const ExpressionHistoryItemRightActionsMemo = memo(
	ExpressionHistoryItemRightActions,
);
