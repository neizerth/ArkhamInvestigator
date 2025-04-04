import {
	selectDisabledInvestigators,
	selectSelectedInvestigators,
	useAppSelector,
} from "@shared/lib";
import {
	InvestigatorPreview,
	type InvestigatorPreviewProps,
} from "@widgets/investigator/investigator-preview";
import { propEq } from "ramda";

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
