import { useAppNavigation } from "@/hooks/useAppNavigation"
import { PropsWithChildren } from "react"

export const Page = ({ children }: PropsWithChildren) => {
  useAppNavigation();

  return children;
}