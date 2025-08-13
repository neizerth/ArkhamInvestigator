import { AppProvider } from "@modules/core/app/app/ui";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { PropsWithChildren } from "react";
import { screenOptions } from "./RootLayout.config";

const asModal = {
	presentation: "transparentModal" as const,
};

export const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="select-investigators/details" options={asModal} />

				<Stack.Screen name="chaos-bag/preview" options={asModal} />
				<Stack.Screen name="chaos-bag/reference/index" options={asModal} />
				<Stack.Screen name="chaos-bag/reference/edit" options={asModal} />
				<Stack.Screen name="chaos-bag/fill" options={asModal} />

				<Stack.Screen name="board/modal/overview" options={asModal} />
				<Stack.Screen name="board/modal/round-reference" options={asModal} />
			</Stack>
			<StatusBar style="light" />

			{children}
		</AppProvider>
	);
};
