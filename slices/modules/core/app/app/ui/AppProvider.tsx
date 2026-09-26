import "react-native-get-random-values";
import "intl-pluralrules";

import { I18NProvider } from "@modules/core/i18n/app";
import { DeeplinkProvider } from "@modules/core/link/app/ui";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { RouterProvider } from "@modules/core/router/app/ui";
import {
	DarkTheme,
	ThemeProvider as RNThemeProvider,
} from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	AppLoadProvider,
	AppStateProvider,
	ErrorProvider,
	StoreProvider,
	ThemeProvider,
} from "./providers";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<ThemeProvider>
				<StoreProvider>
					<ToastProvider>
						<ModalProvider>
							<AppLoadProvider>
								<RNThemeProvider value={DarkTheme}>
									<I18NProvider>
										<ErrorProvider>
											<DeeplinkProvider>
												<AppStateProvider>
													<RouterProvider>{children}</RouterProvider>
												</AppStateProvider>
											</DeeplinkProvider>
										</ErrorProvider>
									</I18NProvider>
								</RNThemeProvider>
							</AppLoadProvider>
						</ModalProvider>
					</ToastProvider>
				</StoreProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};
