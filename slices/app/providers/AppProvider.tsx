import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { StoreProvider } from "./StoreProvider"
import type { PropsWithChildren } from "react"

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <ThemeProvider value={DarkTheme}>
        {children}
      </ThemeProvider>
    </StoreProvider>
  )
}