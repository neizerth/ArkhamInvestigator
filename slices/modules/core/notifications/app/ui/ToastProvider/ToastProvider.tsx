import { size, statusBarHeight } from "@shared/config";
import type { PropsWithChildren } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

const topOffset = Math.max(size.gap.xxl, statusBarHeight);

export const ToastProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<Toast config={toastConfig} topOffset={topOffset} />
		</>
	);
};
