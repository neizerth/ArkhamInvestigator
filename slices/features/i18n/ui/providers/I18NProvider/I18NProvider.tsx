import { i18next } from "@features/i18n/config";
import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

export const I18NProvider = ({ children }: PropsWithChildren) => {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
