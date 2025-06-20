import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import {
	getBoardStats,
	selectCurrentSkinId,
	selectReplaceInvestigator,
	selectTrackXP,
	useAppSelector,
} from "@shared/lib";
import { selectCurrentSignature } from "../../../lib";
import * as C from "./InvestigatorDescription.components";
export const InvestigatorDescription = () => {
	const signature = useAppSelector(selectCurrentSignature);
	const skinId = useAppSelector(selectCurrentSkinId);
	const trackXP = useAppSelector(selectTrackXP);
	const replaceInvestigator = useAppSelector(selectReplaceInvestigator);

	if (!signature) {
		return;
	}

	const imageId = skinId || signature.image.id;
	const version = skinId ? 1 : signature.image.version;

	const uri = getImageUrl({
		code: imageId,
		type: "square",
		version,
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
			{!replaceInvestigator && (
				<C.Settings>
					<C.Counters />
					<C.StatSettings>
						<C.Trauma />
						{trackXP && <C.XP />}
					</C.StatSettings>
				</C.Settings>
			)}
		</C.Container>
	);
};
