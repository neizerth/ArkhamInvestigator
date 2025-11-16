import { createSelector } from "@reduxjs/toolkit";
import { selectSignatureGroups } from "../signature";

import { APP_VERSION } from "@shared/config/app";
import * as semver from "semver";

export const selectAvailableSignatureGroups = createSelector(
	[selectSignatureGroups],
	(groups) => {
		return groups.filter(({ signatures }) => {
			return signatures.every(({ min_version, max_version }) => {
				if (!min_version && !max_version) {
					return true;
				}
				if (min_version && !max_version) {
					return semver.gte(APP_VERSION, min_version);
				}
				if (!min_version && max_version) {
					return semver.lte(APP_VERSION, max_version);
				}
			});
		});
	},
);
