import { useTranslation as useBaseTranslation } from "react-i18next"

export const useTranslation: typeof useBaseTranslation = (ns, options) => {
  const response = useBaseTranslation(ns, options);

  const translate = response.t;

  const translatable = (...args: Parameters<typeof translate>) => {
    const translation = translate(...args)

    return args[0] === translation;
  }

  return {
    ...response,
    translatable
  }
}