import { SystemBars } from "react-native-edge-to-edge";

import type { PropsWithChildren } from "react";
import { AppProvider } from "./AppProvider";

export const AppLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppProvider>
			<SystemBars style="light" />

			{children}
		</AppProvider>
	);
};
