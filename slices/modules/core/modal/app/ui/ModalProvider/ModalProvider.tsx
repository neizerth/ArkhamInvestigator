import type { PropsWithChildren } from "react";
import * as C from "./ModalProvider.components";

import { useModalBackButton } from "../../../shared/base/lib";

export const ModalProvider = ({ children }: PropsWithChildren) => {
	useModalBackButton();

	return (
		<>
			{children}
			<C.Modal />
		</>
	);
};
