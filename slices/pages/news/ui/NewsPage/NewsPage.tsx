import { useAppTranslation } from "@features/i18n";
import { ContentPage } from "@widgets/content-page";

// export type NewsPageProps = {}

export const NewsPage = () => {
	const { t } = useAppTranslation();

	return <ContentPage title={t`Recent updates`} />;
};
