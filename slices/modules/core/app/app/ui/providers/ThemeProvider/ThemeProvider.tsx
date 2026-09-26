import type { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useTheme } from "./useTheme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const theme = useTheme();

	return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
