import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";
import type { PropsWithChildren } from "react";
import { screenOptions } from "./RootLayout.config";

export const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppLayout>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="(modal)" options={asTransparentModal} />
			</Stack>

			{children}
		</AppLayout>
	);
};
