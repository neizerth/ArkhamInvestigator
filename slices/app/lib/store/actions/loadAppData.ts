import { detectDefaultLanguage, setAvailableLanguages } from "@features/i18n";
import { loadInvestigatorsMediaData } from "@shared/api";
import { setIcons, setMediaVersion } from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const loadAppData = (): AppThunk => async (dispatch) => {
	const { icons, languages, version, minClientVersion } =
		await loadInvestigatorsMediaData();

	dispatch(setMediaVersion(version));
	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(icons));
	dispatch(detectDefaultLanguage(languages));
};
