import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { StoreProvider } from "./StoreProvider"
import type { PropsWithChildren } from "react"
import { DataProvider } from "./DataProvider"

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <ThemeProvider value={DarkTheme}>
        <DataProvider>
          {children}
        </DataProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}