import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { color } from "@shared/config";
import { UnscaledText } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { SkillCheckResultPicker } from "../SkillCheckResultPicker";

const tokenColor = chaosToken.color.types;

export const Container: typeof View = styled(View)`
  position: relative;
  align-items: center;
`;

export const Content: typeof View = styled(View)`
  position: relative;
  justify-content: center;
  min-height: 40px;
`;

export const Result: typeof SkillCheckResultPicker = styled(
	SkillCheckResultPicker,
)`
  
`;

export const CompareSymbol: typeof UnscaledText = styled(UnscaledText)`
  position: absolute;
  top: 0px;
  left: -16px;
  color: ${color.white};
  font-size: 25px;
`;
