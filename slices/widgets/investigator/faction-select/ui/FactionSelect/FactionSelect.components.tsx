import { FactionFontIcon, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";
import { color, size } from "@shared/config";

export const Container: typeof Row = styled(Row)`
  border: 1px solid ${color.light10};
  border-radius: 48px;
`

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  
`