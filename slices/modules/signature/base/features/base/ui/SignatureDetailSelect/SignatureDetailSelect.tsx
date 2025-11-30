import { SignatureDetailList } from "@modules/signature/base/entities/ui";
import { whereId } from "@shared/lib/util";
import { ValueSection, type ValueSectionProps } from "@shared/ui";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
	SignaturePreviewSelect,
	type SignaturePreviewSelectProps,
} from "../SignaturePreviewSelect";

export type SignatureDetailSelectProps<T> = Omit<ValueSectionProps, "value"> &
	SignaturePreviewSelectProps<T> & {
		preview?: boolean;
		disabled?: string[];
		defaultLabel?: string;
	};

export function SignatureDetailSelect<T>({
	data,
	title,
	onChange,
	disabled,
	defaultLabel: defaultLabelProp,
	preview = false,
	...props
}: SignatureDetailSelectProps<T>) {
	const { t } = useTranslation();
	const { length } = data;

	const selected = data.find(whereId(props.selectedId));

	const defaultLabel = defaultLabelProp || t`Default`;
	const sectionTitle = `${title} (${length})`;
	const selectedValue = (selected && t(selected.name)) || defaultLabel;

	const Component = preview ? SignaturePreviewSelect : SignatureDetailList;

	return (
		<ValueSection
			title={sectionTitle}
			value={selectedValue}
			showValue={preview}
		>
			<Component
				{...props}
				onChange={onChange}
				data={data}
				disabled={disabled}
			/>
		</ValueSection>
	);
}

export const SignatureDetailSelectMemo = memo(SignatureDetailSelect);
