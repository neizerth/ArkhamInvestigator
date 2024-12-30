import { I18nProvider } from "@/providers/I18nProvider/I18nProvider"
import { StoreProvider } from "@/providers/StoreProvider/StoreProvider"
import { PropsWithChildren } from "react"

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <I18nProvider>
        { children }
      </I18nProvider>
    </StoreProvider>
  )
}