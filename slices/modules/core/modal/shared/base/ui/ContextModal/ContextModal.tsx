import { statusBarHeight } from "@shared/config";
import { Outside } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./ContextModal.components";

type ContextModalAction = {
	icon: string;
	onAction?: () => void;
};

export type ContextModalProps = ViewProps & {
	title: string;
	onClose?: () => void;
	contentStyle?: ViewProps["style"];
	actions?: ContextModalAction[];
	closeIcon?: string;
};

export const ContextModal = ({
	title,
	children,
	onClose,
	contentStyle,
	actions = [],
	closeIcon = "close",
	...props
}: ContextModalProps) => {
	const { height } = useWindowDimensions();
	const maxHeight = height - statusBarHeight - 60;

	const maxHeightStyle = {
		maxHeight,
	};

	const { t } = useTranslation();

	return (
		<C.Container {...props}>
			<Outside onPress={onClose} />
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
				<C.Close onPress={onClose}>
					<C.ActionIcon icon={closeIcon} />
				</C.Close>
			</C.Header>
			<C.Body style={[contentStyle, maxHeightStyle]}>{children}</C.Body>
		</C.Container>
	);
};
