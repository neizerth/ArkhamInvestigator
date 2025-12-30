import { selectTrackXP } from "@modules/board/base/shared/lib";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { selectCurrentSkinId } from "@modules/signature/signature-selection/shared/lib";
import { getBoardStats, useAppSelector } from "@shared/lib";
import type { InvestigatorSignature } from "arkham-investigator-data";
import * as C from "./InvestigatorDescription.components";

export type InvestigatorDescriptionProps = {
	signature: InvestigatorSignature;
};

export const InvestigatorDescription = ({
	signature,
}: InvestigatorDescriptionProps) => {
	const skinId = useAppSelector(selectCurrentSkinId);
	const trackXP = useAppSelector(selectTrackXP);

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
