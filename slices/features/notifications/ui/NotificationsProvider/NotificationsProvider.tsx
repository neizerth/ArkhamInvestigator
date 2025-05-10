import type { PropsWithChildren } from "react";
import * as C from "./NotificationsProvider.components";
// import { Notification } from "../Notification/Notification";

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<C.Notification />
		</>
	);
};
