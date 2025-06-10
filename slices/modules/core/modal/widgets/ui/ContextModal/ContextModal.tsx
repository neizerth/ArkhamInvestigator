import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import { statusBarHeight } from "@shared/config";
import { goBack, useAppDispatch } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./ContextModal.components";

type ContextModalAction = {
	icon: string;
	onAction?: () => void;
};

export type ContextModalProps = ViewProps & {
	title: string;
	onBack?: () => void;
	contentStyle?: ViewProps["style"];
	actions?: ContextModalAction[];
	closeIcon?: string;
};

export const ContextModal = ({
	title,
	children,
	onBack,
	contentStyle,
	actions = [],
	closeIcon = "close",
	...props
}: ContextModalProps) => {
	const dispatch = useAppDispatch();
	const { height } = useWindowDimensions();
	const maxHeight = height - statusBarHeight - 60;

	const maxHeightStyle = {
		maxHeight,
	};

	const { t } = useAppTranslation();

	const back = useCallback(() => {
		dispatch(goBack());
		onBack?.();
	}, [dispatch, onBack]);

	return (
		<C.Container {...props}>
			<Outside onPress={back} />
			<C.Header>
				{actions.length > 0 && (
					<C.Actions>
						{actions.map((action) => (
							<C.Action key={action.icon} onPress={action.onAction}>
								<C.ActionIcon icon={action.icon} />
							</C.Action>
						))}
					</C.Actions>
				)}

				<C.Title>{t(title)}</C.Title>
				<C.Close onPress={back}>
					<C.ActionIcon icon={closeIcon} />
				</C.Close>
			</C.Header>
			<C.Body style={[contentStyle, maxHeightStyle]}>{children}</C.Body>
		</C.Container>
	);
};
