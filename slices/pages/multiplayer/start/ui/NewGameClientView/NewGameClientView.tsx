import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./NewGameClientView.components";

export type NewGameClientViewProps = ViewProps;

export const NewGameClientView = (props: NewGameClientViewProps) => {
	const { t } = useTranslation();
	return (
		<C.Container {...props}>
			<C.CodeInput placeholder={t`multiplayer.code`} />
		</C.Container>
	);
};
