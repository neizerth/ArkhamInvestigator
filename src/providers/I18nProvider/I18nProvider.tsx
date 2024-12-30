import { i18n } from "@/config/i18n";
import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

export const I18nProvider = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}