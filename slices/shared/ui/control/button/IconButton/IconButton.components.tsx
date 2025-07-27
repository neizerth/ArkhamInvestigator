import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { size } from "@shared/config";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px;
`;
