import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components/native";
import { getAppTheme } from "./getAppTheme";

const theme = getAppTheme({
	orientation: {
		orientation: null,
		type: null,
	},
	artworksEnabled: false,
	navbarHeight: 0,
	safeAreaInsets: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
});

export const TestThemeProvider = ({ children }: PropsWithChildren) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
