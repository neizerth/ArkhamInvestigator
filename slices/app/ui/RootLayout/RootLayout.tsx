import "react-native-get-random-values";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAppLoader } from "@app/lib";
import { AppProvider } from "@app/providers/AppProvider";
import { color } from "@shared/config";
import * as SystemUI from "expo-system-ui";
import type { PropsWithChildren } from "react";
import * as C from "./RootLayout.components";
import { screenOptions } from "./RootLayout.config";

export const RootLayout = ({ children }: PropsWithChildren) => {
	const status = useAppLoader();
	SystemUI.setBackgroundColorAsync(color.black);

	if (!status.done) {
		return <C.Loader state={status} />;
	}

	return (
		<AppProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen
					name="select-investigators/details"
					options={{
						presentation: "transparentModal",
					}}
				/>
				<Stack.Screen
					name="board/skill-check"
					options={{
						presentation: "transparentModal",
					}}
				/>
			</Stack>
			<StatusBar style="light" />
			{children}
		</AppProvider>
	);
};
