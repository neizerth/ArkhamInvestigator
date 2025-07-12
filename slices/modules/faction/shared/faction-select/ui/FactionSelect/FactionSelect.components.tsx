import { color, size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { FactionSelectButton } from "../FactionSelectButton";

export const Container: typeof Row = styled(Row)`
  padding: 0px ${size.gap.default}px;
  height: 48px;
`;

export const Content: typeof Row = styled(Row)`
  flex: 1;
  border-radius: 48px;
  border: 1px solid ${color.dark10};
`;

export const Button: typeof FactionSelectButton = styled(FactionSelectButton)`
  flex: 1;
`;
