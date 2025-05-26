import {
	selectReplaceCode,
	selectSelectedInvestigatorByCode,
	useAppSelector,
} from "@shared/lib";
import {
	InvestigatorPreviewMemo as InvestigatorPreview,
	type InvestigatorPreviewProps,
} from "../../../../investigator-preview";
import {
	selectInvestigatorSelectedCount,
	selectIsInvestigatorDisabled,
} from "../../../lib";

export type InvestigatorListItemProps = InvestigatorPreviewProps;

export const InvestigatorListItem = (props: InvestigatorListItemProps) => {
	const replaceCode = useAppSelector(selectReplaceCode);
	const { code } = props;

	const count = useAppSelector(selectInvestigatorSelectedCount(code));
	const selected = useAppSelector(selectSelectedInvestigatorByCode(code));
	const disabled = useAppSelector(selectIsInvestigatorDisabled(code));

	const imageId = selected?.image.id || code;

	const isSelected = count > 0 || replaceCode === code;

	return (
		<InvestigatorPreview
			{...props}
			imageId={imageId}
			selected={isSelected}
			disabled={disabled}
			selectedCount={count}
		/>
	);
};
