import { useAppTranslation } from "@features/i18n";
import { type ModalOkEvent, useModal } from "@features/modal";
import {
	selectSkillCheckHistoryItem,
	setSkillCheckHistoryItemTitle as setTitle,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { memo, useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";
import * as C from "./PinAction.components";

export type PinActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
	onPin?: () => void;
};

export const PinAction = ({
	itemId,
	onPress: onPressProp,
	onPin,
	...props
}: PinActionProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const { title, pinned } = useAppSelector(selectSkillCheckHistoryItem(itemId));

	const setItemTitle = useCallback(
		({ textValue }: ModalOkEvent) => {
			dispatch(setTitle(itemId, textValue?.trim()));

			dispatch(togglePin(itemId));
			onPin?.();
		},
		[dispatch, itemId, onPin],
	);

	const [showSetNameModal] = useModal({
		id: "rename-history-item",
		data: {
			contentType: "input",
			type: "faction",
			faction: "neutral",
			title: t`New Name`,
			okText: t`Okay`,
			cancelText: t`Cancel`,
			defaultValue: title,
		},
		onOk: setItemTitle,
	});

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			if (pinned || title) {
				dispatch(togglePin(itemId));
			} else {
				showSetNameModal();
			}

			onPressProp?.(event);
		},
		[dispatch, onPressProp, showSetNameModal, pinned, title, itemId],
	);

	return <C.Container {...props} pinned={pinned} onPress={onPress} />;
};

export const PinActionMemo = memo(PinAction);
