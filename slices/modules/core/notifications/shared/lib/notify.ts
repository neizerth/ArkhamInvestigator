import { i18next } from "@modules/core/i18n/shared/config";
import type { TOptions } from "i18next";
import { type ShowToastOptions, showToast } from "./toast/showToast";

export type NotifyOptions = ShowToastOptions & {
	data?: TOptions;
};
export const notify = (options: NotifyOptions) => {
	const message = i18next.t(options.message, options.data);
	console.log("message", message, options.message);

	showToast({
		...options,
		message,
	});
};
