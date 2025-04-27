import { goBack, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ContextModal.components";

export type ContextModalProps = ViewProps & {
	title: string;
	onBack?: () => void;
	onAction?: () => void;
	actionIcon?: string;
	contentStyle?: ViewProps["style"];
};

export const ContextModal = ({
	title,
	children,
	onBack,
	actionIcon,
	onAction,
	contentStyle,
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
				{actionIcon && (
					<C.Action onPress={onAction}>
						<C.ActionIcon icon={actionIcon} />
					</C.Action>
				)}
				<C.Title>{t(title)}</C.Title>
				<C.Close onPress={back}>
					<C.ActionIcon icon="close" />
				</C.Close>
			</C.Header>
			<C.Body style={contentStyle}>{children}</C.Body>
		</C.Container>
	);
};
