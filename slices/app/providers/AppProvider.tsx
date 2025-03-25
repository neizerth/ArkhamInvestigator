import { I18NProvider } from "@features/i18n";
import { ModalProvider } from "@features/modal";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataProvider } from "./DataProvider";
import { StoreProvider } from "./StoreProvider";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<I18NProvider>
					<ThemeProvider value={DarkTheme}>
						<DataProvider>
							<ModalProvider>{children}</ModalProvider>
						</DataProvider>
					</ThemeProvider>
				</I18NProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
