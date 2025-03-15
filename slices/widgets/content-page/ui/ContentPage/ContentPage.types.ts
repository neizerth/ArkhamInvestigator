import type { PageProps } from "@shared/ui";

export type ContentPageProps = PageProps & WideProps & {
  title: string
}

export type WideProps = {
  full?: boolean
}