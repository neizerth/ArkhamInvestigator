import { useAppTranslation } from "@features/i18n";
import { type ModalOkEvent, useModal } from "@features/modal";
import {
	reduceBoardCurrentStat,
	selectBoardDetailItems,
	selectCurrentBoardProp,
	selectCurrentFaction,
	useAppDispatch,
	useAppSelector,
	whereId,
} from "@shared/lib";
import { inc, reject } from "ramda";
import { useCallback, useMemo } from "react";

export const useGiveActionAbility = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const signatureGroupId = useAppSelector(
		selectCurrentBoardProp("signatureGroupId"),
	);
	const faction = useAppSelector(selectCurrentFaction);
	const data = useAppSelector(selectBoardDetailItems);

	const value = useMemo(() => {
		return reject(whereId(signatureGroupId), data);
	}, [data, signatureGroupId]);

	const onUpdate = useCallback(
		({ boardIndex }: ModalOkEvent) => {
			if (boardIndex === null) {
				return;
			}

			const boardData = data[boardIndex].data;

			if (!boardData) {
				return;
			}

			dispatch(
				reduceBoardCurrentStat({
					boardId: boardData.id,
					type: "actions",
					reducer: inc,
				}),
			);
		},
		[data, dispatch],
	);

	const [showModal] = useModal({
		id: "give-action",
		data: {
			type: "faction",
			faction,
			contentType: "board",
			title: t`Give action`,
			subtitle: t`Choose an Investigator`,
			okText: t`Okay`,
			cancelText: t`Cancel`,
			value,
		},
		onOk: onUpdate,
	});

	return showModal;
};
