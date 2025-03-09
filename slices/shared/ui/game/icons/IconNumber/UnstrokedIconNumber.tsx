import * as C from './IconNumber.components'
import type { IconNumberComponentProps } from "./IconNumber.types";

export const UnstrokedIconNumber = ({
  value,
  containerStyle,
  ...props
}: IconNumberComponentProps) => {
  
  return (
    <C.Container style={containerStyle}>
      <C.UnstrokedText {...props}>{value}</C.UnstrokedText>
    </C.Container>
  );
}