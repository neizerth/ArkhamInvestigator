import type { PropsWithChildren } from "react";
import { type PermissionStatus, Platform } from "react-native";
import { useAndroidPermission } from "../../lib/hooks";
import type { AndroidPermissionType } from "../../model";

type AndroidPermissionFragmentProps = PropsWithChildren & {
	permission: AndroidPermissionType;
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
		return null;
	}

	if (only && access !== only) {
		return fallback;
	}
	if (except && access === except) {
		return fallback;
	}

	return children;
};
