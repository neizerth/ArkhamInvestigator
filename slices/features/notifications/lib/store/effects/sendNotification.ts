import type { AppThunk } from "@shared/model";
import * as Notifications from "expo-notifications";

export const sendNotification =
	(options: Notifications.NotificationRequestInput): AppThunk =>
	() => {
		Notifications.scheduleNotificationAsync(options);
	};
