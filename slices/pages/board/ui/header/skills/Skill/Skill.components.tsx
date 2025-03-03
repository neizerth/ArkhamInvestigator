import { color } from "@shared/config";
import { IconNumber } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
`

export const ValueContainer: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
`

export const Value: typeof IconNumber = styled(IconNumber)`
  color: ${color.text};
`