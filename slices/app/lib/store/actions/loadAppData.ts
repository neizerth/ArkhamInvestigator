import {
	detectDefaultLanguage,
	setAvailableLanguages,
} from "@modules/i18n/shared/lib";
import { loadInvestigatorsMediaData } from "@shared/api";
import { APP_VERSION } from "@shared/config/app";
import { setAppOutdated, setIcons, setMediaVersion } from "@shared/lib";
import type { AppThunk, ArkhamIcon } from "@shared/model";
import * as semver from "semver";

export const loadAppData = (): AppThunk => async (dispatch) => {
	const { icons, languages, version, minClientVersion } =
		await loadInvestigatorsMediaData();

	const outdated = semver.lt(APP_VERSION, minClientVersion);

	const iconMap = icons.reduce(
		(target, icon) => {
			target[icon.icon] = icon;
			return target;
		},
		{} as Record<string, ArkhamIcon>,
	);
	dispatch(setAppOutdated(outdated));

	dispatch(setMediaVersion(version));
	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(iconMap));
	dispatch(detectDefaultLanguage(languages));
};
