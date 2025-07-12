import type { PropsWithChildren } from "react";

import { useModalBackButton } from "../../../shared/base/lib";

export const ModalProvider = ({ children }: PropsWithChildren) => {
	useModalBackButton();

	return <>{children}</>;
};
