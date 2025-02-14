import { Text as NativeText, View } from "react-native";
import styled from "styled-components/native";

export const Text: typeof NativeText = styled(NativeText)`
  font-family: ArkhamIcons;
`

export const Container: typeof View = styled(View)`
  display: inline-block;
`