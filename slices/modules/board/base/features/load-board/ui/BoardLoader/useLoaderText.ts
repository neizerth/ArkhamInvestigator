import { loadingTranslations } from "@assets/i18n/loading";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { seconds, useAppSelector, useRandom } from "@shared/lib";

export const useLoaderText = () => {
	const language = useAppSelector(selectCurrentLanguage);
	const data = loadingTranslations[language] ?? loadingTranslations.en;

	return useRandom({
		data,
		duration: seconds(5),
	});
};
