import * as C from './IconNumber.components'
import type { IconNumberComponentProps } from "./IconNumber.types";

export const UnstrokedIconNumber = ({
  value,
  containerProps,
  ...props
}: IconNumberComponentProps) => {
  
  return (
    <C.Container {...containerProps}>
      <C.UnstrokedText {...props}>{value}</C.UnstrokedText>
    </C.Container>
  );
}