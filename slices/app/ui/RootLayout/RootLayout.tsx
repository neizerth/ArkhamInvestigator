import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "@modules/core/router/shared/ui";
import type { PropsWithChildren } from "react";
import { screenOptions } from "./RootLayout.config";

export const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppLayout>
			<Stack screenOptions={screenOptions} initialRouteName="index">
				<Stack.Screen name="(modal)" options={asTransparentModal} />
			</Stack>

			{children}
		</AppLayout>
	);
};
