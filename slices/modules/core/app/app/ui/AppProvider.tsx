import { appStarted, initAppUI } from "@modules/core/app/shared/lib";
import { selectAssetsLoaded } from "@modules/core/assets/shared/lib";
import { I18NProvider } from "@modules/core/i18n/app";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { RouterProvider } from "@modules/core/router/app/ui";
import { SoundProvider } from "@modules/core/sound/app";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { DispatchOnMounted, StoreDisplay } from "@shared/ui";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorProvider, StoreProvider } from "./providers";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<DispatchOnMounted actionCreator={appStarted}>
					<StoreDisplay selector={selectAssetsLoaded}>
						<DispatchOnMounted actionCreator={initAppUI}>
							<ThemeProvider value={DarkTheme}>
								<I18NProvider>
									<ErrorProvider>
										<RouterProvider>
											<ToastProvider>
												<ModalProvider>
													<SoundProvider>{children}</SoundProvider>
												</ModalProvider>
											</ToastProvider>
										</RouterProvider>
									</ErrorProvider>
								</I18NProvider>
							</ThemeProvider>
						</DispatchOnMounted>
					</StoreDisplay>
				</DispatchOnMounted>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
