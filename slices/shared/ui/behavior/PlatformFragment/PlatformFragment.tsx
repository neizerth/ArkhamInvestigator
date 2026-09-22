import type { PropsWithChildren } from "react";
import { Platform } from "react-native";
import { collect } from "slices/shared/lib";

type PlatformType = typeof Platform.OS;

export type PlatformViewProps = PropsWithChildren & {
	only?: PlatformType | PlatformType[];
	except?: PlatformType | PlatformType[];
};

type Platforms = PlatformType | PlatformType[];

export const PlatformFragment = (props: PlatformViewProps) => {
	const { only = [], except = [], children } = props;

	const onlyPlatforms = collect(only);
	const exceptPlatforms = collect(except);

	if (onlyPlatforms.length > 0 && !onlyPlatforms.includes(Platform.OS)) {
		return null;
	}

	if (exceptPlatforms.length > 0 && exceptPlatforms.includes(Platform.OS)) {
		return null;
	}

	return children;
};
