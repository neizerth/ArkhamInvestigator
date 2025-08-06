import type { I18NText } from "@modules/core/i18n/shared/model";
import type { ViewProps } from "react-native";

export type BaseModalAction = {
	id: string;
	title: I18NText;
	icon?: string;
	primary?: boolean;
	close?: boolean;
	style?: ViewProps["style"];
};
