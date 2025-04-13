import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import {
	getSignatureImageId,
	selectCurrentSkinId,
	useAppSelector,
} from "@shared/lib";
import { selectCurrentSignature } from "../../../lib";
import * as C from "./InvestigatorDescription.components";
export const InvestigatorDescription = () => {
	const signature = useAppSelector(selectCurrentSignature);
	const skinId = useAppSelector(selectCurrentSkinId);

	if (!signature) {
		return;
	}

	const imageId = skinId || getSignatureImageId(signature);

	const uri = getImageUrl({
		code: imageId,
		type: "square",
	});
	const source = { uri };

	const text = signature.text;
	const traits = signature.traits;

	return (
		<C.Container>
			<C.MainInfo>
				<C.Details>
					<C.Traits>{traits}</C.Traits>
					<C.Skills investigator={signature} />
					<C.Stats investigator={signature} />
				</C.Details>
				<C.ImageContainer>
					<C.Image source={source} />
				</C.ImageContainer>
			</C.MainInfo>
			<C.InvestigatorTextContainer>
				<C.InvestigatorText value={text} />
			</C.InvestigatorTextContainer>
			<C.Settings>
				<C.Trauma />
				<C.XP />
			</C.Settings>
		</C.Container>
	);
};
