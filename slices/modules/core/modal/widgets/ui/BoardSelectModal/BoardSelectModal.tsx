import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { setModalValue } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionModalProps } from "@modules/core/modal/shared/base/ui";
import type { SignatureDetailItem } from "@modules/signature/base/shared/model";
import {
	propIncludes,
	useAppDispatch,
	useAppSelector,
	whereId,
} from "@shared/lib";
import { prop } from "ramda";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBoardDetailItem } from "../../../entities/board-select/lib";
import type { BoardSelectModalData } from "../../../entities/board-select/model";
import * as C from "./BoardSelectModal.components";

export type BoardSelectModalProps<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
> = FactionModalProps<A, D> & {
	value?: number;
};

export function BoardSelectModal<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
>(props: BoardSelectModalProps<A, D>) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { data, value } = props;
	const { boardIds, disabledBoardIds = [] } = data;
	const text = data.text && t(data.text);

	const boards = useAppSelector(selectInvestigatorBoards);

	const defaultId = boards.find(whereId(value))?.signatureGroupId;

	const [selectedId, setSelectedId] = useState(defaultId);

	const detailItems = useMemo(() => {
		return boards.filter(propIncludes("id", boardIds)).map(getBoardDetailItem);
	}, [boards, boardIds]);

	const disabled = useMemo(() => {
		return boards
			.filter(propIncludes("id", disabledBoardIds))
			.map(prop("signatureGroupId"));
	}, [boards, disabledBoardIds]);

	const onChange = useCallback(
		(item: SignatureDetailItem | null) => {
			if (!item) {
				return;
			}
			setSelectedId(item.id);
			dispatch(setModalValue(item.data));
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			{text && <C.Text value={text} />}
			<C.Select
				title={t`Investigators`}
				data={detailItems}
				size={75}
				selectedId={selectedId}
				disabled={disabled}
				onChange={onChange}
				preview
			/>
		</C.Container>
	);
}
