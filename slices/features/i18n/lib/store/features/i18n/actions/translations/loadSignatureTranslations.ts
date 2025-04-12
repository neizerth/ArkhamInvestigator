import { loadSignatures } from "@shared/api";
import { setSignatureGroups, setTabooSignatures } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadSignatureTranslations =
	(language: string): AppThunk =>
	async (dispatch) => {
		const { groups, taboo } = await loadSignatures(language);

		dispatch(setTabooSignatures(taboo));
		dispatch(setSignatureGroups(groups));
		dispatch(updateBoardTranslations());
	};
