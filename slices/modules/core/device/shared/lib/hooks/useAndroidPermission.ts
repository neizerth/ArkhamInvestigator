import { useEffect, useState } from "react";
import type { PermissionStatus } from "react-native";
import type { AndroidPermissionType } from "../../model";
import { requestAndroidPermission } from "../logic";

export function useAndroidPermission(type: AndroidPermissionType) {
	const [access, setAccess] = useState<PermissionStatus | null>(null);

	useEffect(() => {
		requestAndroidPermission(type).then(setAccess);
	}, [type]);

	return access;
}
