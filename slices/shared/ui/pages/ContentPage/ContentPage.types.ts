import type { PageProps } from "../Page";

export type ContentPageProps = PageProps & WideProps & {
  title: string
}

export type WideProps = {
  full?: boolean
}