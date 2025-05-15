import { useAppTranslation } from "@features/i18n";
import { Title } from "@shared/ui";
import * as C from "./ErrorView.components";

export type ErrorViewProps = {
	error: Error;
};

export const ErrorView = ({ error }: ErrorViewProps) => {
	const { t } = useAppTranslation();
	return (
		<C.Container>
			<Title>{t`Error`}</Title>
			<C.Content>{error.message}</C.Content>
			<C.Content>{error.stack}</C.Content>
		</C.Container>
	);
};
