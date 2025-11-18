import { color } from "@shared/config";
import { Value } from "@shared/ui";
import styled from "styled-components/native";

export const Content: typeof Value = styled(Value)`
  color: ${color.resource};
  font-size: 42px;
`;
