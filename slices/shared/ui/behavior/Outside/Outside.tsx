import { Pressable } from "@modules/core/touch/shared/ui";
import styled from "styled-components/native";

/** the dimmed area behind a modal: pressing it closes the modal */
export const Outside: typeof Pressable = styled(Pressable).attrs({
	testID: "modal-outside",
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
