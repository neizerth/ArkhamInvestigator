import { SignaturePreviewMemo as SignaturePreview } from "@modules/signature/base/entities/ui";
import type { InvestigatorDetailItem as Item } from "@shared/model";
import { memo, useCallback } from "react";
import { UnselectedDetail } from "../UnselectedDetail";
import * as C from "./DetailSelect.components";

export type DetailSelectProps = {
	data: Item[];
	disabled?: string[];
	size: number;
	selectedId?: string | null;
	onChange: (item: Item | null, index?: number) => void;
	showNone?: boolean;
	showIcon?: boolean;
};

export const DetailSelect = ({
	data,
	disabled = [],
	onChange,
	size,
	selectedId = null,
	showNone,
	showIcon = true,
}: DetailSelectProps) => {
	const setValue = useCallback(
		(item: Item | null, index?: number) => () => onChange(item, index),
		[onChange],
	);
	const isItemSelected = (item: Item) => item.id === selectedId;
	const isDisabled = (item: Item) => disabled.includes(item.id);

	return (
		<C.Container>
			<C.List horizontal>
				{showNone && (
					<UnselectedDetail
						selected={selectedId === null}
						onPress={setValue(null)}
					/>
				)}

				{data.map((item, index) => (
					<SignaturePreview
						key={item.id}
						imageId={item.imageId}
						code={item.code}
						faction={item.faction}
						selected={isItemSelected(item)}
						disabled={isDisabled(item)}
						onPress={setValue(item, index)}
						icon={item.icon}
						size={size}
						showIcon={showIcon}
					/>
				))}
			</C.List>
		</C.Container>
	);
};

export const DetailSelectMemo = memo(DetailSelect);
