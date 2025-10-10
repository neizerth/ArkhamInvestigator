import type { PropsWithChildren } from "react";
import { FullWindowOverlay } from "react-native-screens";
import * as C from "./ModalProvider.components";

import { useAppSelector } from "@shared/lib";
import { Platform } from "react-native";
import {
	selectFullWindowOverlay,
	useModalBackButton,
} from "../../../shared/base/lib";
import { CustomModals } from "../CustomModals";

const ModalContent = ({ children }: PropsWithChildren) => {
	const overlay = useAppSelector(selectFullWindowOverlay);
	if (Platform.OS !== "ios" || !overlay) {
		return children;
	}

	return <FullWindowOverlay>{children}</FullWindowOverlay>;
};

export const ModalProvider = ({ children }: PropsWithChildren) => {
	useModalBackButton();

	return (
		<>
			{children}
			<ModalContent>
				<C.Modal />
				<CustomModals />
			</ModalContent>
		</>
	);
};
