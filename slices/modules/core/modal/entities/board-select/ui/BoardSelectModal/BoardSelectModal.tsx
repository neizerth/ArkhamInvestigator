import { setModalValue } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import type { FactionModalProps } from "@modules/core/modal/shared/base/ui";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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
	const text = data.text && t(data.text);
	const disabled = data.disabledIds || [];

	const onChange = useCallback(
		(item: InvestigatorDetailItem | null) => {
			if (!item) {
				return;
			}
			dispatch(setModalValue(item.data));
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			{text && <C.Text value={text} />}
			<C.Select
				title={t`Investigators`}
				data={data.data}
				size={75}
				selectedId={data.selectedId}
				disabled={disabled}
				onChange={onChange}
			/>
		</C.Container>
	);
}
