import { useScreenOrientation } from "@modules/core/device/shared/lib";
import { collect } from "@shared/lib/util/collections";
import type { DeviceOrientation } from "@shared/model";
import type { PropsWithChildren } from "react";

export type OrienatationFragmentProps = PropsWithChildren & {
	only?: DeviceOrientation | DeviceOrientation[];
	except?: DeviceOrientation | DeviceOrientation[];
};

export const OrienatationFragment = (props: OrienatationFragmentProps) => {
	const { only = [], except = [], children } = props;
	const { type } = useScreenOrientation();

	const onlyOrientations = collect(only);
	const exceptOrientations = collect(except);

	if (type === "default") {
		return children;
	}

	if (onlyOrientations.length > 0 && !onlyOrientations.includes(type)) {
		return null;
	}

	if (exceptOrientations.length > 0 && exceptOrientations.includes(type)) {
		return null;
	}

	return children;
};
