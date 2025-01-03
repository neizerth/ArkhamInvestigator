import { ComponentProps, forwardRef } from "react";

export type BlockProps = ComponentProps<'div'>;

export type BlockElement = HTMLDivElement;

export const Block = forwardRef<BlockElement, BlockProps>((props: BlockProps, ref) => {
  return <div {...props} ref={ref}/>;
})