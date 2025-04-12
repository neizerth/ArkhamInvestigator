import { useAppTranslation } from "@features/i18n";
import { propEq } from "ramda";
import { memo } from "react";
import {
	type DetailSectionProps,
	DetailSection as Section,
} from "../../DetailSection";
import {
	type DetailSelectProps,
	DetailSelectMemo as Select,
} from "../DetailSelect";

export type DataSectionProps = Omit<DetailSectionProps, "value"> &
	DetailSelectProps;

export const DataSection = ({
	data,
	title,
	onChange,
	...props
}: DataSectionProps) => {
	const { t } = useAppTranslation();
	const { length } = data;
	if (length < 2) {
		return null;
	}

	const selected = data.find(propEq(props.selectedId, "id"));

	const sectionTitle = `${title} (${length})`;
	const selectedValue = (selected && t(selected.name)) || t`Default`;

	return (
		<Section title={sectionTitle} value={selectedValue}>
			<Select {...props} onChange={onChange} data={data} />
		</Section>
	);
};

export const DataSectionMemo = memo(DataSection);
