import { color } from "@shared/config";
import { Row, TouchableOpacity, Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
`

export const Left: typeof Row = styled(Row)`

`

export const Right: typeof Row = styled(Row)`

`

export const Button: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 30px;
  color: ${color.light10};
`