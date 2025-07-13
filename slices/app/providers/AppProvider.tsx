import { I18NProvider } from "@modules/core/i18n/app/ui";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorProvider } from "./ErrorProvider";
import { InitProvider } from "./InitProvider";
import { StoreProvider } from "./StoreProvider";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<ThemeProvider value={DarkTheme}>
					<I18NProvider>
						<ErrorProvider>
							<InitProvider>
								<ToastProvider>
									<ModalProvider>{children}</ModalProvider>
								</ToastProvider>
							</InitProvider>
						</ErrorProvider>
					</I18NProvider>
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
