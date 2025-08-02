import { I18NProvider } from "@modules/core/i18n/app/ui";
import { ModalProvider } from "@modules/core/modal/app/ui";
import { ToastProvider } from "@modules/core/notifications/app/ui/ToastProvider";
import { SoundProvider } from "@modules/core/sound/app";
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
									<ModalProvider>
										<SoundProvider>{children}</SoundProvider>
									</ModalProvider>
								</ToastProvider>
							</InitProvider>
						</ErrorProvider>
					</I18NProvider>
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
