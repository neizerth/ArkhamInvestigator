import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useModal } from "@modules/core/modal/shared/lib";
import type { ModalOkEvent } from "@modules/core/modal/shared/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";

import {
	selectSkillCheckHistoryItem,
	setSkillCheckHistoryItemTitle as setTitle,
	toggleSkillCheckHistoryItemPin,
} from "@modules/board/skill-check/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
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
	const { title, pinned } = useAppSelector(
		selectSkillCheckHistoryItem({ boardId: "current", id: itemId }),
	);
	const faction = useAppSelector(selectCurrentFaction);

	const setItemTitle = useCallback(
		({ textValue }: ModalOkEvent) => {
			dispatch(
				setTitle({
					boardId: "current",
					id: itemId,
					title: textValue?.trim(),
				}),
			);

			dispatch(
				toggleSkillCheckHistoryItemPin({
					boardId: "current",
					id: itemId,
				}),
			);
			onPin?.();
		},
		[dispatch, itemId, onPin],
	);

	const [showSetNameModal] = useModal({
		id: "rename-history-item",
		data: {
			contentType: "input",
			type: "faction",
			faction,
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
				dispatch(
					toggleSkillCheckHistoryItemPin({
						boardId: "current",
						id: itemId,
					}),
				);
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
