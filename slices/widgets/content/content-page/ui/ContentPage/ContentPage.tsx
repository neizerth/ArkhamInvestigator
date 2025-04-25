import { useAppTranslation } from "@features/i18n";
import { goBack, useAppDispatch } from "@shared/lib";
import { Page } from "@shared/ui";
import { useCallback } from "react";
import { TopBar } from "../../../../top-bar";
import * as C from "./ContentPage.components";
import { ContentPageProps } from "./ContentPage.types";

export { ContentPageProps };

export const ContentPage = ({
	title,
	full,
	children,
	...props
}: ContentPageProps) => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const Content = full ? C.FullContent : C.Content;

	return (
		<Page {...props}>
			<TopBar title={t(title)} onBack={back} />
			<Content>{children}</Content>
		</Page>
	);
};
