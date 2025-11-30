import { SignaturePreviewMemo as SignaturePreview } from "@modules/signature/base/entities/ui";
import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import { memo, useCallback } from "react";
import * as C from "./SignaturePreviewSelect.components";

export type SignaturePreviewSelectProps<T> = {
	data: Item<T>[];
	disabled?: string[];
	size: number;
	selectedId?: string | null;
	onChange: (item: Item<T> | null, index?: number) => void;
	showNone?: boolean;
	showIcon?: boolean;
};

export function SignaturePreviewSelect<T>({
	data,
	disabled = [],
	onChange,
	size,
	selectedId = null,
	showNone,
	showIcon = true,
}: SignaturePreviewSelectProps<T>) {
	const setValue = useCallback(
		(item: Item<T> | null, index?: number) => () => onChange(item, index),
		[onChange],
	);
	const isItemSelected = (item: Item<T>) => item.id === selectedId;
	const isDisabled = (item: Item<T>) => disabled.includes(item.id);
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
}

export const SignaturePreviewSelectMemo = memo(SignaturePreviewSelect);
