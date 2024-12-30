import { ComponentProps } from "react";

export type BlockProps = ComponentProps<'div'>;

export const Block = (props: BlockProps) => {
  return <div {...props} />;
}