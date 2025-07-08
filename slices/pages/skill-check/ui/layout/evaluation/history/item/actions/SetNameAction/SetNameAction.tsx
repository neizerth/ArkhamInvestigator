import * as C from "./SetNameAction.components";

import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { useModal } from "@modules/core/modal/shared/lib";
import type { ModalOkEvent } from "@modules/core/modal/shared/model";
import { useAppDispatch, useAppSelector } from "@shared/lib";

import {
	selectSkillCheckHistoryItemTitle as selectTitle,
	setSkillCheckHistoryItemTitle as setTitle,
} from "@modules/board/skill-check/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { memo, useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ExpressionHistoryItemActionProps as ActionProps } from "../../ExpressionHistoryItemAction";

export type SetNameActionProps = Omit<ActionProps, "icon"> & {
	itemId: string;
	onChange?: () => void;
};

export const SetNameAction = ({
	itemId,
	onPress: onPressProp,
	onChange,
	...props
}: SetNameActionProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const title = useAppSelector(
		selectTitle({
			boardId: "current",
			id: itemId,
		}),
	);
	const faction = useAppSelector(selectCurrentFaction);

	const setItemTitle = useCallback(
		({ textValue }: ModalOkEvent) => {
			const title = textValue?.trim();
			dispatch(
				setTitle({
					boardId: "current",
					id: itemId,
					title,
				}),
			);
			onChange?.();
		},
		[dispatch, itemId, onChange],
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
			showSetNameModal();
			onPressProp?.(event);
		},
		[onPressProp, showSetNameModal],
	);

	return <C.Container {...props} onPress={onPress} />;
};

export const SetNameActionMemo = memo(SetNameAction);
