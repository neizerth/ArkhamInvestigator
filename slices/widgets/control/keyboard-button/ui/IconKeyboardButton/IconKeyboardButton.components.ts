import { color } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";
import { KeyboardButtonContainer } from "../KeyboardButtonContainer";

export const Container: typeof KeyboardButtonContainer = styled(
	KeyboardButtonContainer,
)`
`;
export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 25px;
  color: ${color.light10};
`;
