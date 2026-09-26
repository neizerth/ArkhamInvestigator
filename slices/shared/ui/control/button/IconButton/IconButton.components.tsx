import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.size.gap.default}px;
`;
