import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ContextModal.components";

export type ContextModalProps = ViewProps & {
	title: string;
};

export const ContextModal = ({ title }: ContextModalProps) => {
	const { t } = useTranslation();

	return (
		<C.Container>
			<C.Header>{t(title)}</C.Header>
		</C.Container>
	);
};
