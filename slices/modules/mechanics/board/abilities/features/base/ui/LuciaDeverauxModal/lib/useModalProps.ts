import { CustomModalId } from "@modules/core/modal/entities/base/config";
import type { BoardSelectModalData } from "@modules/core/modal/entities/board-select/model";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { selectModalData } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { BoardSelectModalProps } from "@modules/core/modal/widgets/ui";
import { color } from "@shared/config";
import { useAppSelector, whereId } from "@shared/lib";
import { prop } from "ramda";
import { compact } from "ramda-adjunct";
import { useMemo } from "react";
import { selectWoundedBoards } from "./selectWoundedBoards";

type Props = BoardSelectModalProps<
	BaseModalAction,
	BoardSelectModalData<BaseModalAction>
>;

export const useModalProps = (selectedBoardId?: number): Props | null => {
	const data = useAppSelector(
		selectModalData,
	) as BoardSelectModalData<BaseModalAction> | null;

	const woundedBoards = useAppSelector(selectWoundedBoards);

	const firstBoard = woundedBoards[0];

	const currentBoardId = selectedBoardId ?? firstBoard?.id;

	const board = woundedBoards.find(whereId(currentBoardId)) ?? firstBoard;

	return useMemo((): Props | null => {
		if (!data) {
			return null;
		}

		const boardId = board?.id;
		const actions: BaseModalAction[] = board
			? compact([
					board.damage > 0 &&
						createConfirmModalAction({
							id: "heal-damage",
							title: {
								i18nKey: "heal.damage",
								data: {
									count: 1,
								},
							},
							icon: "",
							data: {
								type: "damage",
								boardId,
							},
							style: {
								backgroundColor: color.health,
							},
						}),
					board.horror > 0 &&
						createConfirmModalAction({
							id: "heal-horror",
							title: {
								i18nKey: "heal.horror",
								data: {
									count: 1,
								},
							},
							icon: "",
							data: {
								type: "horror",
								boardId,
							},
							style: {
								backgroundColor: color.sanity,
							},
						}),
				])
			: [];

		const boardIds = woundedBoards.map(prop("id"));

		return {
			id: CustomModalId.LuciaDeveraux,
			data: {
				...data,
				boardIds,
				actions,
			},
		};
	}, [board, data, woundedBoards]);
};
