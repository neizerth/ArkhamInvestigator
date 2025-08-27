import type { InvesigatorBoardPartial } from "@modules/board/base/shared/model";
import type { InvestigatorSettings } from "@modules/signature/base/shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type InvestigatorBoardModificationCallbackOptions =
	InvestigatorSettings & {
		investigator: InvestigatorSignature;
	};

export type InvestigatorBoardModificationCallback = (
	options: InvestigatorBoardModificationCallbackOptions,
) => InvesigatorBoardPartial;

export type InvestigatorBoardModification = Record<
	string,
	InvestigatorBoardModificationCallback
>;
