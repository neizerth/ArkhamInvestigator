import {
	selectDisabledInvestigators,
	selectSelectedInvestigators,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorDetails } from "@shared/model";
import {
	InvestigatorPreviewMemo as InvestigatorPreview,
	type InvestigatorPreviewProps,
} from "@widgets/investigator/investigator-preview";
import { propEq } from "ramda";
import { useCallback } from "react";
import type { FlatListProps } from "react-native";
import { Container } from "./InvestigatorList.components";

type OmitProps = "data" | "key" | "numColumns" | "renderItem" | "keyExtractor";

export type InvestigatorListProps = Omit<
	FlatListProps<InvestigatorDetails>,
	OmitProps
> & {
	data: InvestigatorDetails[];
	onChange: (item: InvestigatorDetails) => void;
};

export const InvestigatorList = ({
	data,
	onChange,
	...props
}: InvestigatorListProps) => {
	const toggleSelected = useCallback(
		(item: InvestigatorDetails) => () => onChange(item),
		[onChange],
	);

	return (
		<Container {...props}>
			{data.map((item) => (
				<InvestigatorListItem
					key={item.investigator.code}
					onPress={toggleSelected(item)}
					investigator={item.investigator}
					media={item.media}
				/>
			))}
		</Container>
	);
};

export const InvestigatorListItem = (props: InvestigatorPreviewProps) => {
	const selectedInvestigators = useAppSelector(selectSelectedInvestigators);
	const disabledInvestigators = useAppSelector(selectDisabledInvestigators);

	const { investigator } = props;

	const selected = selectedInvestigators.filter(
		propEq(investigator.code, "code"),
	);

	const isSelected = selected.length > 0;

	const disabled =
		!isSelected &&
		disabledInvestigators.some(propEq(investigator.code, "code"));

	return (
		<InvestigatorPreview
			{...props}
			selected={isSelected}
			disabled={disabled}
			selectedCount={selected.length}
		/>
	);
};
