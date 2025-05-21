import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef, useState } from "react";

export const useNotifications = () => {
	const [notification, setNotification] =
		useState<Notifications.Notification | null>(null);

	const notificationListener = useRef<Notifications.EventSubscription>();
	const responseListener = useRef<Notifications.EventSubscription>();

	const dismiss = useCallback(() => {
		if (!notification) {
			return;
		}
		Notifications.dismissNotificationAsync(notification.request.identifier);
		setNotification(null);
	}, [notification]);

	useEffect(() => {
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				// console.log(response);
			});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current,
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return [notification, dismiss] as [typeof notification, typeof dismiss];
};
