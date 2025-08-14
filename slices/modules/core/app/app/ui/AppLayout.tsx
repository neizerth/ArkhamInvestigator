import { StatusBar } from "expo-status-bar";
import type { PropsWithChildren } from "react";
import { AppProvider } from "./AppProvider";

export const AppLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppProvider>
			<StatusBar style="light" />

			{children}
		</AppProvider>
	);
};
