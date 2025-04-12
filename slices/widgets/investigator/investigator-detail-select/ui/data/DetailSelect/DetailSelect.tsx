import type { InvestigatorDetailItem as Item } from "@shared/model";
import { memo, useCallback } from "react";
import { InvestigatorPreviewMemo as InvestigatorPreview } from "../../../../investigator-preview";
import { CARD_SIZE } from "../../../config";
import { UnselectedDetail } from "../UnselectedDetail";
import * as C from "./DetailSelect.components";

export type DetailSelectProps = {
	data: Item[];
	selectedId?: string | null;
	onChange: (item: Item | null) => void;
	showNone?: boolean;
	showIcon?: boolean;
};

export const DetailSelect = ({
	data,
	onChange,
	selectedId = null,
	showNone,
	showIcon = true,
}: DetailSelectProps) => {
	const setValue = useCallback(
		(item: Item | null) => () => onChange(item),
		[onChange],
	);
	const isItemSelected = (item: Item) => item.id === selectedId;

	return (
		<C.Container>
			<C.List horizontal>
				{showNone && (
					<UnselectedDetail
						selected={selectedId === null}
						onPress={setValue(null)}
					/>
				)}

				{data.map((item) => (
					<InvestigatorPreview
						key={item.id}
						imageId={item.imageId}
						code={item.code}
						faction={item.faction}
						selected={isItemSelected(item)}
						onPress={setValue(item)}
						icon={item.icon}
						size={CARD_SIZE}
						showIcon={showIcon}
					/>
				))}
			</C.List>
		</C.Container>
	);
};

export const DetailSelectMemo = memo(DetailSelect);
