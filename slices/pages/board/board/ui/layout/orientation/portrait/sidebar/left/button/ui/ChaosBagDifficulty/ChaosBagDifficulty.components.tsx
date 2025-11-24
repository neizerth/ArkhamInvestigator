import { Alegreya } from "@assets/fonts";
import { color } from "@shared/config";
import { Icon, Row, Text, Value } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../../../../config";
import {
	StatPicker,
	type StatPickerProps,
} from "../../../../../../../../shared";

export const Container: typeof Row = styled(Row)`
  position: relative;
  width: 42px;
`;

export const FixedValue: typeof Value = styled(Value)`
  color: ${color.resource};
  font-size: 21px;
`;

export const Wild: typeof Icon = styled(Icon)`
  position: absolute;
  left: -10px;
  top: -18px;
  color: ${color.white};
  font-size: 20px;
`;

type PickerProps = StatPickerProps & {
	position: "top" | "bottom";
};

export const Picker: FC<PickerProps> = styled(StatPicker).attrs({
	valueStyle: {
		color: color.resource,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
})`
  position: absolute;
  z-index: 4;
  right: 0px;
  top: -9px;
  ${({ position }: PickerProps) =>
		position === "top" &&
		css`
      top: -35px;
    `}
`;

const InfoView: typeof Row = styled(Row)`
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const DifficultyView: typeof InfoView = styled(InfoView)`
  top: -8px;
  left: 2px;
  gap: 5px;
`;

export const SkillValueView: typeof InfoView = styled(InfoView)`
  bottom: 1px;
  left: 2px;
  gap: 2px;
`;

export const Character: typeof Text = styled(Text)`
  font-family: ${Alegreya.bold};
  font-size: 28px;
  line-height: 28px;
`;
