import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { InvestigatorDetailItem } from "@shared/model";

export const getBoardDetailItem = (
	board: InvestigatorBoard,
): InvestigatorDetailItem<number> => {
	const { investigator, signatureGroupId, image } = board;
	return {
		id: signatureGroupId,
		code: signatureGroupId,
		imageId: image.id,
		image,
		faction: investigator.faction_code,
		type: investigator.type,
		name: investigator.name,
		value: investigator.id,
		data: board.id,
	};
};
