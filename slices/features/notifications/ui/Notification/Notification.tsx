import type { Notification as ExpoNotification } from "expo-notifications";
import type { ViewProps } from "react-native";
import * as C from "./Notification.components";

export type NotificationProps = ViewProps & {
	notification: ExpoNotification;
};

export const Notification = ({ notification, ...props }: NotificationProps) => {
	const { content } = notification.request;
	return (
		<C.Container {...props}>
			<C.Title>{content.title}</C.Title>
			<C.Close icon="cancel" />
		</C.Container>
	);
};
