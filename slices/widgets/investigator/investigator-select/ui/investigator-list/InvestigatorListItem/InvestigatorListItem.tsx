import {
	SignaturePreviewMemo as SignaturePreview,
	type SignaturePreviewProps,
} from "@modules/signature/base/entities/ui";
import {
	selectReplaceCode,
	selectSelectedInvestigatorByCode,
	useAppSelector,
} from "@shared/lib";
import {
	selectInvestigatorSelectedCount,
	selectIsInvestigatorDisabled,
} from "../../../lib";

export type InvestigatorListItemProps = SignaturePreviewProps;

export const InvestigatorListItem = (props: InvestigatorListItemProps) => {
	const replaceCode = useAppSelector(selectReplaceCode);
	const { code } = props;

	const count = useAppSelector(selectInvestigatorSelectedCount(code));
	const selected = useAppSelector(selectSelectedInvestigatorByCode(code));
	const disabled = useAppSelector(selectIsInvestigatorDisabled(code));

	const imageId = selected?.image.id || props.imageId || code;

	const isSelected = count > 0 || replaceCode === code;

	return (
		<SignaturePreview
			{...props}
			imageId={imageId}
			selected={isSelected}
			disabled={disabled}
			selectedCount={count}
		/>
	);
};
