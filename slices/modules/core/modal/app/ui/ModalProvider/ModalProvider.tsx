import type { PropsWithChildren } from "react";
import { FullWindowOverlay } from "react-native-screens";
import * as C from "./ModalProvider.components";

import { useAppSelector } from "@shared/lib";
import { Platform } from "react-native";
import {
	selectFullWindowOverlay,
	selectModalId,
	useModalBackButton,
} from "../../../shared/base/lib";
import { CustomModals } from "../CustomModals";

const ModalContent = ({ children }: PropsWithChildren) => {
	const overlay = useAppSelector(selectFullWindowOverlay);
	const id = useAppSelector(selectModalId);

	// The overlay is a separate native layer above the whole window. Mounted permanently it hides
	// the app from iOS accessibility clients (VoiceOver, XCUITest/Maestro see an empty tree), so it
	// exists only while a modal is open.
	if (Platform.OS !== "ios" || !overlay || !id) {
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
