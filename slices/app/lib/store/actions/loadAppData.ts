import { detectDefaultLanguage, setAvailableLanguages } from "@features/i18n";
import { loadInvestigatorsMediaData } from "@shared/api";
import { APP_VERSION } from "@shared/config/app";
import { setAppOutdated, setIcons, setMediaVersion } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import * as semver from "semver";

export const loadAppData = (): AppThunk => async (dispatch) => {
	const { icons, languages, version, minClientVersion } =
		await loadInvestigatorsMediaData();

	const outdated = semver.lt(APP_VERSION, minClientVersion);

	dispatch(setAppOutdated(outdated));

	dispatch(setMediaVersion(version));
	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(icons));
	dispatch(detectDefaultLanguage(languages));
};
