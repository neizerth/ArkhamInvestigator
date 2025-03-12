import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { StoreProvider } from "./StoreProvider"
import type { PropsWithChildren } from "react"
import { DataProvider } from "./DataProvider"
import { I18NProvider } from "@features/i18n"

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <I18NProvider>
        <ThemeProvider value={DarkTheme}>
          <DataProvider>
            {children}
          </DataProvider>
        </ThemeProvider>
      </I18NProvider>
    </StoreProvider>
  )
}