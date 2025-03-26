import {
	detectDefaultLanguage,
	setAvailableLanguages,
	setLanguage,
} from "@features/i18n";
import { loadGameCoreData } from "@shared/api";
import {
	type AppThunk,
	setIcons,
	setInvestigatorSources,
	setStories,
} from "@shared/lib";
import { setEncounterSets } from "@shared/lib/store/features/encounterSets";
import { prop } from "ramda";

export const loadAppData = (): AppThunk => async (dispatch) => {
	const response = await loadGameCoreData();
	const { languages, icons, encounterSets } = response;

	const stories = response.stories.filter(
		({ investigators }) => investigators.length > 0,
	);
	const investigatorSources = stories.flatMap(prop("investigators"));

	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(icons));
	dispatch(setEncounterSets(encounterSets));
	dispatch(setInvestigatorSources(investigatorSources));
	dispatch(setStories(stories));
	dispatch(detectDefaultLanguage(languages));
};
