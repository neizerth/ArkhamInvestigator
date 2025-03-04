import { size } from "@shared/config";
import { TouchableOpacity } from "@shared/ui/behavior";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px;
`
