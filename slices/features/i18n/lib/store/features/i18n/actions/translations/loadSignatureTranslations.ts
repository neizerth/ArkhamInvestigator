import { loadLocaleData } from "@shared/api";
import {
	setSignatureGroups,
	setStories,
	setTabooSignatures,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadSignatureTranslations =
	(language: string): AppThunk =>
	async (dispatch) => {
		const { groups, taboo, stories } = await loadLocaleData(language);

		dispatch(setTabooSignatures(taboo));
		dispatch(setSignatureGroups(groups));
		dispatch(setStories(stories));
		dispatch(updateBoardTranslations());
	};
