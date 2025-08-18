import "react-native-get-random-values";
import "intl-pluralrules";

import { I18NProvider } from "@modules/core/i18n/app";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { RouterProvider } from "@modules/core/router/app/ui";
import { SoundProvider } from "@modules/core/sound/app";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppLoadProvider, ErrorProvider, StoreProvider } from "./providers";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<ToastProvider>
					<ModalProvider>
						<AppLoadProvider>
							<ThemeProvider value={DarkTheme}>
								<I18NProvider>
									<ErrorProvider>
										<RouterProvider>
											<SoundProvider>{children}</SoundProvider>
										</RouterProvider>
									</ErrorProvider>
								</I18NProvider>
							</ThemeProvider>
						</AppLoadProvider>
					</ModalProvider>
				</ToastProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
