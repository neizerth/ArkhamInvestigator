import "react-native-get-random-values";
import "intl-pluralrules";

import { I18NProvider } from "@modules/core/i18n/app";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { RouterProvider } from "@modules/core/router/app/ui";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppLoadProvider, ErrorProvider, StoreProvider } from "./providers";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<ModalProvider>
					<AppLoadProvider>
						<ThemeProvider value={DarkTheme}>
							<I18NProvider>
								<ErrorProvider>
									<ToastProvider>
										<RouterProvider>{children}</RouterProvider>
									</ToastProvider>
								</ErrorProvider>
							</I18NProvider>
						</ThemeProvider>
					</AppLoadProvider>
				</ModalProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
