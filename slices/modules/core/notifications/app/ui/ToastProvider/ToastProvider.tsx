import { selectModalId } from "@modules/core/modal/shared/base/lib";
import { size, statusBarHeight } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { Fragment, type PropsWithChildren } from "react";
import { Platform } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

const topOffset = statusBarHeight + size.gap.default;
const Content = Platform.OS === "ios" ? FullWindowOverlay : Fragment;

const defaultId = "toast-content";

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const dynamicId = useAppSelector(selectModalId);

	const id = Platform.OS === "ios" ? (dynamicId ?? defaultId) : defaultId;

	return (
		<>
			{children}
			<Content key={id}>
				<Toast config={toastConfig} topOffset={topOffset} />
			</Content>
		</>
	);
};
