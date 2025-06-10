import { GameText } from "@entities/game-text";
import { color, font, size } from "@shared/config";
import { Outside as BaseOutside, Input as TextInput } from "@shared/ui";
import { FactionCardMemo } from "@widgets/investigator/faction/faction-card";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import { FactionModalBoardSelect } from "../FactionModalBoardSelect";

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;

export const Card: typeof FactionCardMemo = styled(FactionCardMemo)`
  flex: 1;
  z-index: 2;
`;

export const Container: typeof KeyboardAvoidingView = styled(
	KeyboardAvoidingView,
)`

  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  padding: ${size.gap.xxl}px ${size.gap.default}px;
`;

export const CardContent: typeof View = styled(View)`

`;

export const Outside = styled(BaseOutside)`
  z-index: 1;
`;

export const Input: typeof TextInput = styled(TextInput)`

`;

export const BoardSelect: typeof FactionModalBoardSelect = styled(
	FactionModalBoardSelect,
)`

`;
