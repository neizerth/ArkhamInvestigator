import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { i18next } from "../../../shared/config";

export const I18NProvider = ({ children }: PropsWithChildren) => {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
