import { selectCurrentBoardId } from "@modules/board/base/shared/lib";
import { processModalAction } from "@modules/core/modal/shared/base/lib";
import type {
	BaseModalAction,
	BaseModalActionTitle,
} from "@modules/core/modal/shared/base/model";
import type { FactionCardAction } from "@modules/faction/shared/faction-card";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useFactionModalActions<Action extends BaseModalAction>(
	actions: Action[],
) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const boardId = useAppSelector(selectCurrentBoardId);

	const getTitle = useCallback(
		(title: BaseModalActionTitle) => {
			if (typeof title === "string") {
				return t(title);
			}
			return t(title.i18nKey, title.data);
		},
		[t],
	);

	return useMemo(() => {
		return actions.map(
			(modalAction): FactionCardAction => ({
				...modalAction,
				title: getTitle(modalAction.title),
				onPress: () =>
					dispatch(
						processModalAction({
							boardId,
							modalAction,
						}),
					),
			}),
		);
	}, [actions, dispatch, getTitle, boardId]);
}
