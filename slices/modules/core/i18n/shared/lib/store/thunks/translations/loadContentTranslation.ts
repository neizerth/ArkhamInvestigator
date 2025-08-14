import { setRules } from "@modules/mechanics/rules/base/shared/lib";
import { setSignatureGroups } from "@modules/signature/shared/lib";
import { setStories } from "@modules/stories/shared/lib";
import { loadLocaleData } from "@shared/api";
import type { AppThunk } from "@shared/model";

export const loadContentTranslation =
	(language: string): AppThunk =>
	async (dispatch) => {
		const { groups, stories, rules } = await loadLocaleData(language);

		dispatch(setSignatureGroups(groups));
		dispatch(setStories(stories));
		dispatch(setRules(rules));
	};
