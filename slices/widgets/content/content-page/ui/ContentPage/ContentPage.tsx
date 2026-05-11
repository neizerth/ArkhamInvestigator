import { goBack } from "@modules/core/router/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { Page, PageContent } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TopBar } from "../../../../navigation/top-bar";
import { ContentPageProps } from "./ContentPage.types";

export { ContentPageProps };

export const ContentPage = ({
	title,
	full,
	contentStyle,
	children,
	onBack,
	...props
}: ContentPageProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const back = useCallback(() => {
		dispatch(goBack());
		onBack?.();
	}, [dispatch, onBack]);

	return (
		<Page {...props}>
			<TopBar title={t(title)} onBack={back} />
			<PageContent style={contentStyle} full={full}>
				{children}
			</PageContent>
		</Page>
	);
};
