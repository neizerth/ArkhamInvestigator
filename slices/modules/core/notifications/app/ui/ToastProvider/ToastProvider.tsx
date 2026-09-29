import { selectModalId } from "@modules/core/modal/shared/base/lib";
import { E2E, size, statusBarHeight } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { Fragment, type PropsWithChildren } from "react";
import { Platform } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

const topOffset = statusBarHeight + size.gap.default;

const defaultId = "toast-content";

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const dynamicId = useAppSelector(selectModalId);

	const id = Platform.OS === "ios" ? (dynamicId ?? defaultId) : defaultId;
	// The overlay is a separate native layer above the window: it is only needed to show toasts
	// above an open modal. Mounted permanently it hides the app from iOS accessibility clients.
	const Content =
		Platform.OS === "ios" && dynamicId && !E2E ? FullWindowOverlay : Fragment;

	return (
		<>
			{children}
			<Content key={id}>
				<Toast config={toastConfig} topOffset={topOffset} />
			</Content>
		</>
	);
};
