import { color, gameAssets, size } from "@shared/config";
import * as UI from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../config";
import { withStat } from "../../../../../lib";
import { BaseStatPicker, type DefinedBaseStatPickerProps } from "../../common";
import { StatPickerMemo as StatPicker } from "../../common/StatPicker";

const BaseContent = withStat(UI.Resource, {
	height: assetsSize.resource,
	ratio: gameAssets.resource.ratio,
});

export const Container: typeof View = styled(View)`
	position: relative;
	margin-top: ${-size.gap.xxl}px;
	padding-top: ${size.gap.xxl}px;
	padding-bottom: ${size.gap.default}px;
	min-width: ${assetsSize.main}px;
	align-items: center;
`;

export const Content: typeof BaseContent = styled(BaseContent)`
	position: relative;
`;

export const Value: typeof UI.Value = styled(UI.Value)`
  color: ${color.resource};
`;

export const UpkeepResources: FC<DefinedBaseStatPickerProps> = styled(
	BaseStatPicker,
).attrs({
	statType: "upkeepResourcesIncrease",
	valueStyle: {
		color: color.resource,
		fontSize: 42,
	},
	itemHeight: assetsSize.main,
	contentContainerStyle: {
		position: "absolute",
		zIndex: 2,
		right: -10,
		top: 0,
	},
	gap: 5,
})`
		
	`;

export const Picker: typeof StatPicker = styled(StatPicker).attrs({
	valueStyle: {
		color: color.resource,
	},
	itemHeight: assetsSize.resource,
})`
  
  `;
