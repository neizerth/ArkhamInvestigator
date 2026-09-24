import {
	StatFigure,
	type StatFigureProps,
} from "@modules/board/base/entities/base/ui/value";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { BoardValue, type BoardValueProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const Container: FC<Omit<StatFigureProps, "stat" | "size">> = (
	props,
) => <StatFigure {...props} stat="clues" size="medium" />;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.clue};
`;

const pickerValues: Record<string, FC<BoardValueProps>> = {};

/** one styled value per testID prefix, created once and reused */
export const pickerValue = (statTestID: string): FC<BoardValueProps> => {
	if (!pickerValues[statTestID]) {
		pickerValues[statTestID] = styled(BoardValue).attrs({
			testID: `${statTestID}-value`,
		})``;
	}

	return pickerValues[statTestID];
};

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.clue,
	},
	itemHeight: assetsSize.main,
})`
  position: absolute;
`;

// export const Lock: FC<LockProps> = styled(IconButton).attrs(
// 	({ enabled }: LockProps) => ({
// 		iconStyle: {
// 			color: enabled ? "rgba(86, 122, 45, 0.8)" : "rgba(255, 255, 255, 0.4)",
// 			fontSize: 24,
// 		},
// 	}),
// )`
// 	color:rgb(86, 122, 45);
//   position: absolute;
//   z-index: 2;
//   right: -25px;
//   top: -52px;
// 	width: 50px;
// 	align-items: flex-start;
// 	filter: drop-shadow(0px 0px 5px 0 rgba(0, 0, 0, 0.3));
// 	${({ enabled }: LockProps) =>
// 		enabled &&
// 		css`
// 		filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
// 	`}
// `;

export const Lock: typeof TouchableOpacity = styled(TouchableOpacity).attrs({
	testID: "clues-lock",
})`
  position: absolute;
  z-index: 2;
  right: -28px;
  top: -45px;
	width: 50px;
	height: 50px;
	padding-right: 5px;
	align-items: center;
	justify-content: center;
`;

type LockIconProps = UI.IconProps & {
	enabled?: boolean;
	light?: boolean;
};

export const LockIcon: FC<LockIconProps> = styled(UI.Icon)`

	color: rgba(255, 255, 255, 0.3);
	font-size: 24px;
	line-height: 24px;
	height: 30px;
	width: 30px;
	${({ light }: LockIconProps) =>
		light &&
		css`
			color: rgba(0, 0, 0, 0.3);
		`}
	${({ enabled }: LockIconProps) =>
		enabled &&
		css`
			color: rgb(86, 122, 45);
		`}
`;
