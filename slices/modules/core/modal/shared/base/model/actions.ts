import type { TOptions } from "i18next";
import type { ViewProps } from "react-native";

export type BaseModalActionTitle =
	| string
	| {
			i18nKey: string;
			data?: TOptions;
	  };

export type BaseModalAction = {
	id: string;
	title: BaseModalActionTitle;
	icon?: string;
	primary?: boolean;
	close?: boolean;
	style?: ViewProps["style"];
};
