import { color, size } from "@shared/config";
import { ArkhamDigits } from "@shared/fonts/ArkhamDigits";
import { Copasetic } from "@shared/fonts/Copasetic";
import { Icon } from "@shared/ui";
import { Text, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
`

export const Expression: typeof Text = styled(Text)`
  font-family: ${Copasetic.regular};
  font-size: 40px;
  color: ${color.light10};
  text-align: right;
  letter-spacing: 2px;
`

export const Stat: typeof Icon = styled(Icon)`
  font-size: 30px;
`