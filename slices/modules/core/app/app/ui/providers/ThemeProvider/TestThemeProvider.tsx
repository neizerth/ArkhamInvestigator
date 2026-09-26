import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components/native";
import { getAppTheme } from "./getAppTheme";

const theme = getAppTheme();

export const TestThemeProvider = ({ children }: PropsWithChildren) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
