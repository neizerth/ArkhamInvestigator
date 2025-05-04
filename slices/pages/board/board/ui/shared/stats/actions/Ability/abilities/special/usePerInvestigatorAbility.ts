import { useAppTranslation } from "@features/i18n";
import { type ModalOkEvent, useModal } from "@features/modal";
import {
	selectAbilityUseInfo,
	selectBoardDetailItems,
	selectBoardsCount,
	selectCurrentBoardProp,
	selectCurrentFaction,
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	selectIsAbilityUsed,
	useAppDispatch,
	useAppSelector,
	whereId,
} from "@shared/lib";
import { setAbilityUsed } from "@shared/lib/store/features/board/actions/stats/ability/setAbilityUsed";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { always, prop, reject } from "ramda";
import { useCallback, useMemo } from "react";

type Options = {
	ability: InvestigatorAbility;
	title: string;
	onChange?: (boardId: number) => void;
};

export const usePerInvestigatorAbility = ({
	ability,
	title,
	onChange,
}: Options) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const signatureGroupId = useAppSelector(
		selectCurrentBoardProp("signatureGroupId"),
	);
	const boardsCount = useAppSelector(selectBoardsCount);
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex) ?? 0;
	const nextBoardId = useAppSelector(
		(state) =>
			selectInvestigatorBoards(state)[(currentIndex + 1) % boardsCount].id,
	);

	const faction = useAppSelector(selectCurrentFaction);
	const data = useAppSelector(selectBoardDetailItems);
	const useInfo = useAppSelector(selectAbilityUseInfo(ability.id));

	const used = useAppSelector(selectIsAbilityUsed(ability.id));
	const boardIds = useInfo?.boardIds || [];

	const value = useMemo(() => {
		if (ability.personalUse) {
			return data;
		}
		return reject(whereId(signatureGroupId), data);
	}, [data, signatureGroupId, ability.personalUse]);

	const disabled = useMemo(() => {
		return value
			.filter(({ data }) => boardIds.includes(data?.id || -1))
			.map(prop("id"));
	}, [boardIds, value]);

	const handleBoardId = useCallback(
		(boardId: number) => {
			dispatch(setAbilityUsed(ability.id, boardId));
			onChange?.(boardId);
		},
		[dispatch, onChange, ability.id],
	);

	const onOk = useCallback(
		({ boardIndex }: ModalOkEvent) => {
			if (boardIndex === null) {
				return;
			}

			const boardDetails = value[boardIndex];

			if (!boardDetails.data) {
				return;
			}
			const boardId = boardDetails.data.id;

			handleBoardId(boardId);
		},
		[value, handleBoardId],
	);

	const [showModal] = useModal({
		id: `ability_${ability.id}`,
		data: {
			type: "faction",
			faction,
			contentType: "board",
			title,
			subtitle: t`Choose an Investigator`,
			okText: t`Okay`,
			cancelText: t`Cancel`,
			value,
			disabled,
		},
		onOk: onOk,
	});

	const handleNextBoard = useCallback(() => {
		handleBoardId(nextBoardId);
	}, [handleBoardId, nextBoardId]);

	const modalBoardsCount = ability.personalUse ? 2 : 3;

	if (boardsCount < modalBoardsCount) {
		return used ? always(false) : handleNextBoard;
	}

	return showModal;
};
