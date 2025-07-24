import type { BuildInfo } from "arkham-investigator-data";
import moment from "moment";
import { propEq } from "ramda";
import * as semver from "semver";

type Options = {
	info: BuildInfo;
	mediaVersion: string | null;
	mediaUpdateTime: string | null;
	locale: string;
};

export const isUpdateNeeded = ({
	mediaVersion,
	mediaUpdateTime,
	info,
	locale,
}: Options) => {
	if (!mediaVersion || !mediaUpdateTime) {
		return true;
	}
	const { version, arkhamCardsUpdates } = info;

	if (semver.lt(mediaVersion, version)) {
		return true;
	}

	const update = arkhamCardsUpdates.find(propEq(locale, "locale"));

	if (!update) {
		return true;
	}

	console.log(mediaUpdateTime);

	const localTime = moment(mediaUpdateTime);
	const lastUpdateAt = moment(update.cards_updated_at);

	if (localTime.valueOf() < lastUpdateAt.valueOf()) {
		return true;
	}

	return false;
};
