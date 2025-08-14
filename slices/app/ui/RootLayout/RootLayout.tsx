import { AppLayout } from "@modules/core/app/app/ui";
import { Stack } from "expo-router";
import type { PropsWithChildren } from "react";
import { screenOptions } from "./RootLayout.config";

export const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppLayout>
			<Stack screenOptions={screenOptions} initialRouteName="index" />

			{children}
		</AppLayout>
	);
};
