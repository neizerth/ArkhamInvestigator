import styled from "styled-components/native";
import { color, size } from "../../../config";
import { Row } from "../../grid";
import { Button as BaseButton } from "../button/Button";

export const Container: typeof Row = styled(Row)`
  align-items: center;
  gap: ${size.gap.small}px;
`;

export const Button: typeof BaseButton = styled(BaseButton)`
  padding: 0px;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  background-color: ${color.dark20};
`;
