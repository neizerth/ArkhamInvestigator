import { AppLayout } from "@modules/core/app/app/ui";
import { Stack } from "@modules/core/router/entities/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { preventAutoHideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { screenOptions } from "./RootLayout.config";

// the app loader hides it once it is shown
preventAutoHideAsync();

export const RootLayout = () => {
	return (
		<AppLayout>
			<Stack screenOptions={screenOptions} initialRouteName="index">
				<Stack.Screen name="(modal)" options={asTransparentModal} />
			</Stack>

			<StatusBar style="light" />
		</AppLayout>
	);
};
