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
				<ThemeProvider value={DarkTheme}>
					<I18NProvider>
						<DataProvider>
							<ModalProvider>{children}</ModalProvider>
						</DataProvider>
					</I18NProvider>
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
