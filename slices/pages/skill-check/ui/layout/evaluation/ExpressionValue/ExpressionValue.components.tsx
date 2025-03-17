import { color } from "@shared/config"
import { Copasetic } from "@shared/fonts"
import { AppText } from "@shared/ui"
import { Text } from "react-native"
import { View } from "react-native"
import styled from "styled-components/native"

export const Container: typeof View = styled(View)`
  
`

export const Value: typeof AppText = styled(AppText)`
  font-family: ${Copasetic.regular};
  font-size: 30px;
  color: ${color.dark10};
  text-align: right;

  letter-spacing: 2px;
`