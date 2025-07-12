import type { PropsWithChildren } from "react";
import * as C from "./ModalProvider.components";

import { useModalBackButton } from "../../../shared/base/lib";
import { CustomModals } from "../CustomModals";

export const ModalProvider = ({ children }: PropsWithChildren) => {
	useModalBackButton();

	return (
		<>
			{children}
			<C.Modal />
			<CustomModals />
		</>
	);
};
