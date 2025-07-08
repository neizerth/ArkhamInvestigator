import type { PropsWithChildren } from "react";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

export const ToastProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<Toast config={toastConfig} />
		</>
	);
};
