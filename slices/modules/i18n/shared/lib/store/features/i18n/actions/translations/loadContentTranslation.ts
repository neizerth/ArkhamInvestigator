import { loadLocaleData } from "@shared/api";
import {
	setSignatureGroups,
	setStories,
	setTabooSignatures,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { setRules } from "../../../../../../../../../features/game/rules/lib/store/features/rules";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadContentTranslation =
	(language: string): AppThunk =>
	async (dispatch) => {
		const { groups, taboo, stories, rules } = await loadLocaleData(language);

		dispatch(setTabooSignatures(taboo));
		dispatch(setSignatureGroups(groups));
		dispatch(setStories(stories));
		dispatch(setRules(rules));
		dispatch(updateBoardTranslations());
	};
