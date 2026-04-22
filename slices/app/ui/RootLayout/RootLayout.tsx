import { AppLayout } from "@modules/core/app/app/ui";
import { Stack } from "@modules/core/router/entities/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { StatusBar } from "expo-status-bar";
import { screenOptions } from "./RootLayout.config";

export const RootLayout = () => {
	return (
		<AppLayout>
			<Stack screenOptions={screenOptions} initialRouteName="index">
				<Stack.Screen name="(modal)" options={asTransparentModal} />
			</Stack>

			<StatusBar style="dark" />
		</AppLayout>
	);
};
