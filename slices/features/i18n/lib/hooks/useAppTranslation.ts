import { useTranslation } from "react-i18next"

export const useAppTranslation: typeof useTranslation = (ns, options) => {
  type Args = Parameters<typeof translate>;
  const response = useTranslation(ns, options);

  const translate = response.t;

  const translatable = (...args: Args) => {
    const translation = translate(...args)

    return args[0] === translation;
  }

  return {
    ...response,
    translatable
  }
}