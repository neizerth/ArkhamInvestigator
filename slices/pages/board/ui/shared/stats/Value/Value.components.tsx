import { IS_WEB } from "@shared/config";
import { IconNumber } from "@shared/ui";
import { Platform, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
`

export const Value: typeof IconNumber = styled(IconNumber)
  .attrs({
    stroke: true,
  })`
    color: white;
    font-size: 50px;
  `