import { Value } from "@shared/ui";
import styled from "styled-components/native";

export const Content: typeof Value = styled(Value)`
  color: ${({ theme }) => theme.color.resource};
  font-size: 42px;
`;
