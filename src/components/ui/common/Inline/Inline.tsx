import { ComponentProps, forwardRef } from "react";

export type InlineProps = ComponentProps<'span'>;

export type InlineElement = HTMLSpanElement;

export const Inline = forwardRef<InlineElement, InlineProps>((props: InlineProps, ref) => {
  return <span {...props} ref={ref}/>;
})