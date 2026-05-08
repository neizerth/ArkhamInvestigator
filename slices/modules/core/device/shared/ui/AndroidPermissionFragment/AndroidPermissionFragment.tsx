import type { PropsWithChildren } from "react";
import {
	type PermissionStatus,
	type PermissionsAndroid,
	Platform,
} from "react-native";
import { useAndroidPermission } from "../../lib/hooks";

type Permission = keyof typeof PermissionsAndroid.PERMISSIONS;

type AndroidPermissionFragmentProps = PropsWithChildren & {
	permission: Permission;
	only?: PermissionStatus;
	except?: PermissionStatus;
	fallback?: React.ReactNode;
};

export const AndroidPermissionFragment = ({
	permission,
	only,
	except,
	children,
	fallback,
}: AndroidPermissionFragmentProps) => {
	const access = useAndroidPermission(permission);

	if (Platform.OS !== "android") {
		return children;
	}

	if (!access) {
		return fallback;
	}

	if (only && access !== only) {
		return fallback;
	}
	if (except && access === except) {
		return fallback;
	}

	return children;
};
