import { useAppTranslation } from "@modules/i18n/shared/lib";
import type { PropsWithError } from "@shared/model";
import { Title } from "@shared/ui";
import * as C from "./ErrorView.components";

export type ErrorViewProps = PropsWithError;

export const ErrorView = ({ error }: ErrorViewProps) => {
	const { t } = useAppTranslation();

	return (
		<C.Container>
			<Title>{t`Error`}</Title>
			<C.Body>
				<C.Content>{error.message}</C.Content>
			</C.Body>
		</C.Container>
	);
};
