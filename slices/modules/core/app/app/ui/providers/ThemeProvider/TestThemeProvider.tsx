import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components/native";
import { getAppTheme } from "./getAppTheme";

const theme = getAppTheme({ orientation: {}, artworksEnabled: false });

export const TestThemeProvider = ({ children }: PropsWithChildren) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
