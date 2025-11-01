import { SignaturePreviewMemo as SignaturePreview } from "@modules/signature/base/entities/ui";
import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import { memo, useCallback } from "react";
import * as C from "./SignaturePreviewSelect.components";

export type SignaturePreviewSelectProps = {
	data: Item[];
	disabled?: string[];
	size: number;
	selectedId?: string | null;
	onChange: (item: Item | null, index?: number) => void;
	showNone?: boolean;
	showIcon?: boolean;
};

export const SignaturePreviewSelect = ({
	data,
	disabled = [],
	onChange,
	size,
	selectedId = null,
	showNone,
	showIcon = true,
}: SignaturePreviewSelectProps) => {
	const setValue = useCallback(
		(item: Item | null, index?: number) => () => onChange(item, index),
		[onChange],
	);
	const isItemSelected = (item: Item) => item.id === selectedId;
	const isDisabled = (item: Item) => disabled.includes(item.id);
	const isEmptySelected = selectedId === null;

	return (
		<C.Container>
			<C.List horizontal>
				{showNone && (
					<C.Empty
						selected={isEmptySelected}
						onPress={setValue(null)}
						size={size}
					>
						<C.EmptyIcon icon="blocked" />
					</C.Empty>
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

export const SignaturePreviewSelectMemo = memo(SignaturePreviewSelect);
