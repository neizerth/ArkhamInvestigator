import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { setModalValue } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionModalProps } from "@modules/core/modal/shared/base/ui";
import { propIncludes, useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { prop } from "ramda";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBoardDetailItem } from "../../lib";
import type { BoardSelectModalData } from "../../model";
import * as C from "./BoardSelectModal.components";

export type BoardSelectModalProps<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
> = FactionModalProps<A, D>;

export function BoardSelectModal<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
>(props: BoardSelectModalProps<A, D>) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { data } = props;
	const { boardIds, disabledBoardIds = [] } = data;
	const text = data.text && t(data.text);

	const [selectedId, setSelectedId] = useState<string>();
	const boards = useAppSelector(selectInvestigatorBoards);

	const detailItems = useMemo(() => {
		return boards.filter(propIncludes("id", boardIds)).map(getBoardDetailItem);
	}, [boards, boardIds]);

	const disabled = useMemo(() => {
		return boards
			.filter(propIncludes("id", disabledBoardIds))
			.map(prop("signatureGroupId"));
	}, [boards, disabledBoardIds]);

	const onChange = useCallback(
		(item: InvestigatorDetailItem | null) => {
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
			/>
		</C.Container>
	);
}
