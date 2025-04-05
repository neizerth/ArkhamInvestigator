import { useAppSelector } from "@shared/lib";
import {
	InvestigatorPreview,
	type InvestigatorPreviewProps,
} from "@widgets/investigator/investigator-preview";
import {
	selectInvestigatorSelectedCount,
	selectIsInvestigatorDisabled,
} from "@widgets/investigator/investigator-select/lib";

export type InvestigatorListItemProps = InvestigatorPreviewProps;

export const InvestigatorListItem = (props: InvestigatorListItemProps) => {
	const { code } = props.investigator;

	const count = useAppSelector(selectInvestigatorSelectedCount(code));
	const disabled = useAppSelector(selectIsInvestigatorDisabled(code));

	const isSelected = count > 0;

	return (
		<InvestigatorPreview
			{...props}
			selected={isSelected}
			disabled={disabled}
			selectedCount={count}
		/>
	);
};
