import "react-native-get-random-values";
import "intl-pluralrules";

import { DeviceProvider } from "@modules/core/device/app/ui";
import { I18NProvider } from "@modules/core/i18n/app";
import { DeeplinkProvider } from "@modules/core/link/app/ui";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { RouterProvider } from "@modules/core/router/app/ui";
import {
	DarkTheme,
	ThemeProvider as RNThemeProvider,
} from "expo-router/react-navigation";
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
			<StoreProvider>
				<DeviceProvider>
					<ThemeProvider>
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
					</ThemeProvider>
				</DeviceProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
