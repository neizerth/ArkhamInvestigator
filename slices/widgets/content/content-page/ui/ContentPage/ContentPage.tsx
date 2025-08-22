import { goBack } from "@modules/core/router/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { Page } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TopBar } from "../../../../navigation/top-bar";
import * as C from "./ContentPage.components";
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

	const Content = full ? C.FullContent : C.Content;

	return (
		<Page {...props}>
			<TopBar title={t(title)} onBack={back} />
			<Content style={contentStyle}>{children}</Content>
		</Page>
	);
};
