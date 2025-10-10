import { size, statusBarHeight } from "@shared/config";
import { Fragment, type PropsWithChildren } from "react";
import { Platform } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

const topOffset = statusBarHeight + size.gap.default;
const Content = Platform.OS === "ios" ? FullWindowOverlay : Fragment;

export const ToastProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<Content>
				<Toast config={toastConfig} topOffset={topOffset} />
			</Content>
		</>
	);
};
