import { i18next } from "@modules/core/i18n/shared/config";
import type { TOptions } from "i18next";
import { type ShowToastOptions, showToast } from "./showToast";

type Options = ShowToastOptions & {
	data?: TOptions;
};
export const notify = (options: Options) => {
	const message = i18next.t(options.message, options.data);

	showToast({
		...options,
		message,
	});
};
