import type { InvestigatorDetailItem as Item } from "@shared/model";
import { InvestigatorPreviewMemo as InvestigatorPreview } from "@widgets/investigator/investigator-preview";
import { prop } from "ramda";
import { memo, useCallback } from "react";
import { CARD_SIZE } from "../../../config";
import { UnselectedDetail } from "../UnselectedDetail";
import { Container, List } from "./DetailSelect.components";

export type DetailSelectProps = {
	data: Item[];
	selected: Item | null;
	onChange: (item: Item | null) => void;
	showNone?: boolean;
	showIcon?: boolean;
};

export const DetailSelect = ({
	data,
	onChange,
	selected,
	showNone,
	showIcon = true,
}: DetailSelectProps) => {
	const setValue = useCallback(
		(item: Item | null) => () => onChange(item),
		[onChange],
	);
	const isItemSelected = (item: Item) =>
		item.id === selected?.id || (item.value === null && selected === null);

	return (
		<Container>
			<List horizontal>
				{showNone && (
					<UnselectedDetail
						selected={selected === null}
						onPress={setValue(null)}
					/>
				)}

				{data.map((item) => (
					<InvestigatorPreview
						key={item.id}
						imageId={item.imageId}
						investigator={item.details.investigator}
						selected={isItemSelected(item)}
						onPress={setValue(item)}
						icon={item.icon}
						size={CARD_SIZE}
						showIcon={showIcon}
					/>
				))}
			</List>
		</Container>
	);
};

export const DetailSelectMemo = memo(DetailSelect);
