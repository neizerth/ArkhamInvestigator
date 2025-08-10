import {
	AutoFail as Fail,
	AutoSuccessThin as Success,
} from "@modules/chaos-bag/base/shared/ui";
import { ResultValue as BaseResultValue } from "@modules/chaos-bag/result/shared/ui";
import { color, factionColor } from "@shared/config";
import { IconNumber, Row, StatIcon, Text } from "@shared/ui";
import {
	InvestigatorPreview,
	type InvestigatorPreviewProps,
} from "@widgets/investigator";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

const RelativeView: typeof View = styled(View)`
  position: relative;
`;

export const Container: typeof RelativeView = styled(RelativeView)`
  position: relative;
`;

export const Image: typeof InvestigatorPreview = styled(InvestigatorPreview)`
  border-radius: 24px;
  border: 1px solid;
  ${({ faction }: InvestigatorPreviewProps) => css`
    border-color: ${factionColor[faction].border};
  `}
`;

export const SkillValue: typeof Row = styled(Row)`
  position: absolute;
  bottom: -5px;
  left: -5px;
  align-items: center;
  min-width: 30px;
`;

export const SkillType: typeof Row = styled(Row)`
  position: absolute;
  top: -15px;
  left: -10px;
  align-items: center;
`;

export const Difficulty: typeof Row = styled(Row)`
  position: absolute;
  top: -9px;
  right: -5px;
  align-items: center;
`;

export const Result: typeof Row = styled(Row)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  align-items: center;
`;

const valueAttrs = {
	stroke: true,
	strokeStyle: {
		color: color.text,
	},
};

export const ResultValue: typeof BaseResultValue = styled(BaseResultValue)`
  font-size: 20px;
`;

export const DifficultyType: typeof Text = styled(Text)`
  position: relative;
  top: -1px;
`;

export const Value: typeof IconNumber = styled(IconNumber).attrs(valueAttrs)`
  color: ${color.white};
  font-size: 20px;
`;

export const SkillTypeIcon: typeof StatIcon = styled(StatIcon)`
  font-size: 24px;
  line-height: 40px;
  color: white;
`;

export const SpecialResult: typeof View = styled(View)`

`;

export const AutoFail: typeof Fail = styled(Fail)`
  line-height: 20px;
  font-size: 20px;
`;

export const AutoSuccess: typeof Success = styled(Success)`
  line-height: 35px;
  font-size: 35px;
  top: 6px;
  right: -12px;
`;
