import { color } from "@shared/config"
import { Icon as BaseIcon, TouchableOpacity } from "@shared/ui"
import styled from "styled-components/native"

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 20px;
  color: ${color.light10};
`

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  
`