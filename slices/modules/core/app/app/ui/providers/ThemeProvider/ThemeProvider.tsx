import type { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./useTheme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const theme = useTheme();
	return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
