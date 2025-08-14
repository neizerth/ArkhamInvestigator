import { APP_VERSION } from "@shared/config/app";
import * as semver from "semver";

export const isOutdatedAppVersion = (minVersion: string) => {
	return semver.lt(APP_VERSION, minVersion);
};
