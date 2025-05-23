import { useAppTranslation } from "@features/i18n";
import { whereId } from "@shared/lib";
import { memo } from "react";
import {
	type DetailSectionProps,
	DetailSection as Section,
} from "../DetailSection";
import {
	type DetailSelectProps,
	DetailSelectMemo as Select,
} from "../DetailSelect";

export type InvestigatorSelectSectionProps = Omit<DetailSectionProps, "value"> &
	DetailSelectProps & {
		disabled?: string[];
		defaultLabel?: string;
	};

export const InvestigatorSelectSection = ({
	data,
	title,
	onChange,
	disabled,
	defaultLabel: defaultLabelProp,
	...props
}: InvestigatorSelectSectionProps) => {
	const { t } = useAppTranslation();
	const { length } = data;
	if (length < 2) {
		return null;
	}

	const selected = data.find(whereId(props.selectedId));

	const defaultLabel = defaultLabelProp || t`Default`;
	const sectionTitle = `${title} (${length})`;
	const selectedValue = (selected && t(selected.name)) || defaultLabel;

	return (
		<Section title={sectionTitle} value={selectedValue}>
			<Select {...props} onChange={onChange} data={data} disabled={disabled} />
		</Section>
	);
};

export const InvestigatorSelectSectionMemo = memo(InvestigatorSelectSection);
