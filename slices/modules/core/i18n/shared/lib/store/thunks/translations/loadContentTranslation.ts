import { setRules } from "@modules/mechanics/rules/base/shared/lib";
import { setStories } from "@modules/stories/shared/lib";
import { loadLocaleData } from "@shared/api";
import { setSignatureGroups } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { updateBoardTranslations } from "./updateBoardTranslations";

export const loadContentTranslation =
	(language: string): AppThunk =>
	async (dispatch) => {
		const { groups, stories, rules } = await loadLocaleData(language);

		dispatch(setSignatureGroups(groups));
		dispatch(setStories(stories));
		dispatch(setRules(rules));
		dispatch(updateBoardTranslations());
	};
