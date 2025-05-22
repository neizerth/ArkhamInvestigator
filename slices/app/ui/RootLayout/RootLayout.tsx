import "react-native-get-random-values";

import { useAppLoader, useDeviceInit } from "@app/lib";
import { AppProvider } from "@app/providers/AppProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { PropsWithChildren } from "react";
import * as C from "./RootLayout.components";
import { screenOptions } from "./RootLayout.config";

const asModal = {
	presentation: "transparentModal" as const,
};

export const RootLayout = ({ children }: PropsWithChildren) => {
	const status = useAppLoader();
	useDeviceInit();

	if (!status.done) {
		return <C.Loader state={status} />;
	}

	return (
		<AppProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="select-investigators/details" options={asModal} />
				<Stack.Screen name="chaos-bag/preview" options={asModal} />
				<Stack.Screen name="chaos-bag/reference/index" options={asModal} />
				<Stack.Screen name="chaos-bag/reference/edit" options={asModal} />
				<Stack.Screen name="board/overview" options={asModal} />
			</Stack>
			<StatusBar style="light" />
			{children}
		</AppProvider>
	);
};
