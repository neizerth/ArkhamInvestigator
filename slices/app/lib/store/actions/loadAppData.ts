import { detectDefaultLanguage, setAvailableLanguages } from "@features/i18n";
import { loadGameCoreData } from "@shared/api";
import { setIcons, setStories } from "@shared/lib";
import { setEncounterSets } from "@shared/lib/store/features/encounterSets";
import type { AppThunk } from "@shared/model";

export const loadAppData = (): AppThunk => async (dispatch) => {
	const response = await loadGameCoreData();
	const { languages, icons, encounterSets } = response;

	const stories = response.stories.filter(
		({ investigators }) => investigators.length > 0,
	);

	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(icons));
	dispatch(setEncounterSets(encounterSets));
	dispatch(setStories(stories));
	dispatch(detectDefaultLanguage(languages));
};
