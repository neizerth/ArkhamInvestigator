import { ChaosBagProvider } from "@features/game/chaos-bag";
import { I18NProvider } from "@features/i18n";
import { ModalProvider } from "@features/modal";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorProvider } from "./ErrorProvider";
import { InitProvider } from "./InitProvider";
import { OutdatedCheckProvider } from "./OutdatedCheckProvider";
import { StoreProvider } from "./StoreProvider";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<GestureHandlerRootView>
			<StoreProvider>
				<ThemeProvider value={DarkTheme}>
					<I18NProvider>
						<ErrorProvider>
							<InitProvider>
								<ModalProvider>
									<OutdatedCheckProvider>
										<ChaosBagProvider>{children}</ChaosBagProvider>
									</OutdatedCheckProvider>
								</ModalProvider>
							</InitProvider>
						</ErrorProvider>
					</I18NProvider>
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	);
};
