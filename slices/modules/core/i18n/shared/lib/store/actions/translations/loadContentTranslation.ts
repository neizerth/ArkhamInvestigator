import { setRules } from "@features/game/rules/lib/store";
import { setStories } from "@modules/stories/shared/lib";
import { loadLocaleData } from "@shared/api";
import { setSignatureGroups, setTabooSignatures } from "@shared/lib";
import type { AppThunk } from "@shared/model";
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
