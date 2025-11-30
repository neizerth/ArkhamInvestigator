import { selectTrackXP } from "@modules/board/base/shared/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import {
	getBoardStats,
	selectCurrentSkinId,
	useAppSelector,
} from "@shared/lib";
import { selectCurrentSignature } from "../../../lib";
import * as C from "./InvestigatorDescription.components";
export const InvestigatorDescription = () => {
	const signature = useAppSelector(selectCurrentSignature);
	const skinId = useAppSelector(selectCurrentSkinId);
	const trackXP = useAppSelector(selectTrackXP);

	if (!signature) {
		return;
	}

	const imageId = skinId || signature.image.id;

	const uri = getSignatureImageUrl({
		code: imageId,
		type: "square",
	});
	const source = { uri };

	const text = signature.text;
	const traits = signature.traits;

	const stats = getBoardStats(signature);

	return (
		<C.Container>
			<C.MainInfo>
				<C.Details>
					<C.Traits>{traits}</C.Traits>
					<C.Skills {...stats} />
					<C.Stats {...stats} />
				</C.Details>
				<C.ImageContainer>
					<C.Image source={source} />
				</C.ImageContainer>
			</C.MainInfo>
			<C.InvestigatorTextContainer>
				<C.InvestigatorText value={text} />
			</C.InvestigatorTextContainer>
			<C.Settings>
				<C.Counters />
				<C.StatSettings>
					<C.Trauma />
					{trackXP && <C.XP />}
				</C.StatSettings>
			</C.Settings>
		</C.Container>
	);
};
