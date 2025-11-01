import { selectCurrentBoardId } from "@modules/board/base/shared/lib";
import { useI18NText } from "@modules/core/i18n/shared/lib";
import { processModalAction } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionCardAction } from "@modules/faction/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useMemo } from "react";

export function useFactionModalActions<Action extends BaseModalAction>(
	actions: Action[],
) {
	const dispatch = useAppDispatch();
	const translate = useI18NText();
	const boardId = useAppSelector(selectCurrentBoardId);

	return useMemo(() => {
		return actions.map(
			(modalAction): FactionCardAction => ({
				...modalAction,
				title: translate(modalAction.title),
				onPress: () =>
					dispatch(
						processModalAction({
							boardId,
							modalAction,
						}),
					),
			}),
		);
	}, [actions, dispatch, translate, boardId]);
}
