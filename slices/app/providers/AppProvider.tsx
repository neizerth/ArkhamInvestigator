import { ChaosBagProvider } from "@features/chaos-bag";
import { I18NProvider } from "@features/i18n";
import { ModalProvider } from "@features/modal";
import { NotificationsProvider } from "@features/notifications";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InitProvider } from "./InitProvider";
import { OutdatedCheckProvider } from "./OutdatedCheckProvider";
import { StoreProvider } from "./StoreProvider";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<ThemeProvider value={DarkTheme}>
					<I18NProvider>
						<InitProvider>
							<ModalProvider>
								<OutdatedCheckProvider>
									<NotificationsProvider>
										<ChaosBagProvider>{children}</ChaosBagProvider>
									</NotificationsProvider>
								</OutdatedCheckProvider>
							</ModalProvider>
						</InitProvider>
					</I18NProvider>
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
