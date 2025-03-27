import { color } from "@shared/config";
import { UnscaledText } from "@shared/ui";
import styled from "styled-components/native";

export const Traits: typeof UnscaledText = styled(UnscaledText)`
  text-align: center;
  color: ${color.text}
`;
