import { useSafeAreaInsets } from "@modules/core/device/entities/base/lib";
import type { PropsWithChildren } from "react";

export const DeviceProvider = ({ children }: PropsWithChildren) => {
	useSafeAreaInsets();
	return children;
};
