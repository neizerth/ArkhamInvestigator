import { useNotifications } from "../../lib/useNotifications";
import type { NotificationProps } from "../Notification";
import * as C from "./AppNotification.components";

export type AppNotificationProps = Omit<NotificationProps, "notification">;

export const AppNotification = (props: AppNotificationProps) => {
	const [notification, dismiss] = useNotifications();

	if (!notification) {
		return null;
	}

	return (
		<C.Container {...props} onPress={dismiss}>
			<C.Content notification={notification} />
		</C.Container>
	);
};
