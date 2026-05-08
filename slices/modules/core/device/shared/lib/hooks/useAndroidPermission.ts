import { useEffect, useState } from "react";
import {
	type PermissionStatus,
	PermissionsAndroid,
	Platform,
} from "react-native";

type Permission = keyof typeof PermissionsAndroid.PERMISSIONS;

export function useAndroidPermission(permission: Permission) {
	const [access, setAccess] = useState<PermissionStatus | null>(null);

	useEffect(() => {
		if (Platform.OS !== "android") {
			return;
		}
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permission]).then(
			setAccess,
		);
	}, [permission]);

	return access;
}
