import { useAppTranslation } from "@features/i18n";
import { Title } from "@shared/ui";
import * as C from "./ErrorView.components";

export type ErrorViewProps = {
	error: Error;
};

export const ErrorView = ({ error }: ErrorViewProps) => {
	const { t } = useAppTranslation();

	console.log({ error });
	return (
		<C.Container>
			<Title>{t`Error`}</Title>
			<C.Message>{error.message}</C.Message>
		</C.Container>
	);
};
