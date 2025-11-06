import { setModalValue } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionModalProps } from "@modules/core/modal/shared/base/ui";
import type { SignatureDetailItem } from "@modules/signature/base/shared/model";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { BoardSelectModalData } from "../../../entities/board-select/model";
import * as C from "./BoardSelectModal.components";

export type BoardSelectModalProps<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
> = FactionModalProps<A, D> & {
	value?: number;
	onChange?: (item: SignatureDetailItem<number>) => void;
};

export function BoardSelectModal<
	A extends BaseModalAction,
	D extends BoardSelectModalData<A>,
>({ value, onChange: onChangeProp, ...props }: BoardSelectModalProps<A, D>) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { data } = props;
	const { boardIds, disabledBoardIds = [] } = data;
	const text = data.text && t(data.text);

	const [selectedId, setSelectedId] = useState<number | undefined>(value);

	const onChange = useCallback(
		(item: SignatureDetailItem<number> | null) => {
			if (!item) {
				return;
			}
			onChangeProp?.(item);
			setSelectedId(item.data);
			dispatch(setModalValue(item.data));
		},
		[dispatch, onChangeProp],
	);

	return (
		<C.Container {...props}>
			{text && <C.Text value={text} />}
			<C.Select
				title={t`Investigators`}
				data={boardIds}
				size={75}
				value={selectedId}
				disabled={disabledBoardIds}
				onChange={onChange}
				preview
			/>
		</C.Container>
	);
}
