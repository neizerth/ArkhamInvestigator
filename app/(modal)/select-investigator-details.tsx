import { selectCurrentSignatureGroup } from "@modules/signature/signature-selection/shared/lib";
import { SelectedSignatureDetails } from "@modules/signature/signature-selection/widgets/selected-signature-details";
import { useAppSelector } from "@shared/lib";

export default function Modal() {
	const group = useAppSelector(selectCurrentSignatureGroup);

	if (!group) {
		return null;
	}

	return <SelectedSignatureDetails group={group} />;
}
