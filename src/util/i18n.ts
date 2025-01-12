import { DEFAULT_NAMESPACE, i18n } from "@/config/i18n";
import type { Mapping } from "@/types/common";

export const hasResourceBundle = (language: string, ns = DEFAULT_NAMESPACE) => 
  i18n.hasResourceBundle(language, ns);

export const addResourceBundle = (language: string, bundle: Mapping, ns = DEFAULT_NAMESPACE, deep = true, overwrite = true) => {
  i18n.addResourceBundle(language, ns, bundle, deep, overwrite);
}

export const setI18NLanguage = (language: string) => i18n.changeLanguage(language);

export const createTranslation = (ns = DEFAULT_NAMESPACE, language: string | null = null) => i18n.getFixedT(language, ns);

export const getLanguage = () => i18n.language;

export const getStoryNS = (code: string) => `story.${code}`;