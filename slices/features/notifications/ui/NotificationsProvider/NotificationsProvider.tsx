import type { PropsWithChildren } from "react";
import * as C from "./NotificationsProvider.components";

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<C.Notification />
		</>
	);
};
