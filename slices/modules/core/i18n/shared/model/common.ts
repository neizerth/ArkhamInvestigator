import type { TOptions } from "i18next";

export type Translation = Record<string, string>;

export type I18NText =
	| string
	| {
			i18nKey: string;
			data?: TOptions;
	  };
