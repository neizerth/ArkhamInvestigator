import {
	IconButton,
	type IconButtonProps,
} from "@modules/core/haptic/shared/ui";
import { color, gameAssets } from "@shared/config";
import * as UI from "@shared/ui";
import { Value as BaseValue } from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { withStat } from "../../../../../lib";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

export const BaseContainer = withStat(UI.Clue, {
	ratio: gameAssets.clue.ratio,
});

export const Container: typeof BaseContainer = styled(BaseContainer)`
  
`;

export const Value: typeof BaseValue = styled(BaseValue)`
  color: ${color.clue};
`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.clue,
	},
	itemHeight: assetsSize.main,
})`
  
  `;

type LockProps = IconButtonProps & {
	enabled?: boolean;
};

export const Lock: FC<LockProps> = styled(IconButton).attrs(
	({ enabled }: LockProps) => ({
		iconStyle: {
			color: enabled ? "rgb(86, 122, 45)" : color.dark10,
			fontSize: 24,
		},
	}),
)`
	color:rgb(86, 122, 45);
  position: absolute;
  z-index: 2;
  right: -25px;
  top: -57px;
	width: 50px;
	align-items: flex-start;
`;
