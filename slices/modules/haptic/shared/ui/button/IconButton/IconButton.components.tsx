import { size } from "@shared/config";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../TouchableOpacity";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px;
`;
