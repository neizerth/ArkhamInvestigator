import { APP_SCHEME } from "@shared/config";

export const isDeeplink = (path: string) => {
	return path.startsWith(`${APP_SCHEME}://`);
};
