import { useInvestigatorNavigation } from "./navigation/useInvestigatorNavigation";
import { useLanguageNavigation } from "./navigation/useLanguageNavigation"

export const useAppNavigation = () => {
  useLanguageNavigation();
  useInvestigatorNavigation();
}