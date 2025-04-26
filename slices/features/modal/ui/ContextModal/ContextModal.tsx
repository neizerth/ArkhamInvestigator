import { goBack, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ContextModal.components";

export type ContextModalProps = ViewProps & {
	title: string;
	onBack?: () => void;
};

export const ContextModal = ({
	title,
	children,
	onBack,
	...props
}: ContextModalProps) => {
	const dispatch = useAppDispatch();

	const { t } = useTranslation();

	const back = useCallback(() => {
		dispatch(goBack());
		onBack?.();
	}, [dispatch, onBack]);

	return (
		<C.Container {...props}>
			<C.Header>
				<C.Title>{t(title)}</C.Title>
				<C.Close onPress={back}>
					<C.CloseIcon icon="close" />
				</C.Close>
			</C.Header>
			<C.Body>{children}</C.Body>
		</C.Container>
	);
};
