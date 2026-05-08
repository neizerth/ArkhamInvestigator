import { PermissionsAndroid, Platform } from "react-native";
import type { AndroidPermissionType } from "../../model";

export const requestAndroidPermission = (type: AndroidPermissionType) => {
	if (Platform.OS !== "android") {
		return Promise.resolve(null);
	}
	const permission = PermissionsAndroid.PERMISSIONS[type];
	return PermissionsAndroid.request(permission);
};
