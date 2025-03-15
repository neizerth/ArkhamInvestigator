
import styled from "styled-components/native";
import { TouchableOpacity } from "../../behavior";
import { size } from "../../../config";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px;
`
