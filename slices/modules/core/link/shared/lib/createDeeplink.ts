import { APP_SCHEME } from "@shared/config/app";
import { buildQueryString } from "./buildQueryString";

export const createDeeplink = (
	path: string,
	qs: Record<string, string> = {},
) => {
	const queryString = buildQueryString(qs);

	const url = new URL(`${APP_SCHEME}://${path}`);
	url.search = queryString;
	return url.toString();
};
