import { Fragment, type PropsWithChildren } from "react";
import { FullWindowOverlay } from "react-native-screens";
import * as C from "./ModalProvider.components";

import { Platform } from "react-native";
import { useModalBackButton } from "../../../shared/base/lib";
import { CustomModals } from "../CustomModals";

const Content = Platform.OS === "ios" ? FullWindowOverlay : Fragment;

export const ModalProvider = ({ children }: PropsWithChildren) => {
	useModalBackButton();

	return (
		<>
			{children}
			<Content>
				<C.Modal />
				<CustomModals />
			</Content>
		</>
	);
};
