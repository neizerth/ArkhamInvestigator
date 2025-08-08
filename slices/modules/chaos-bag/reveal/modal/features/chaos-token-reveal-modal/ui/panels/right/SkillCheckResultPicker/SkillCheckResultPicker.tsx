import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { PickerListRenderItem } from "@widgets/control/picker";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./SkillCheckResultPicker.components";

export type SkillCheckResultPickerProps = ViewProps & {
	succeedBy: string;
	value: string;
	fail?: boolean;
};

export const SkillCheckResultPicker = ({
	succeedBy,
	fail,
	value,
}: SkillCheckResultPickerProps) => {
	// const data = ["success", succeedBy];
	const data = ["success", succeedBy, "fail"];
	// const data = [succeedBy];

	const renderItem: PickerListRenderItem<string> = useCallback(
		({ item }) => {
			if (item === "success") {
				return <C.AutoSuccess type="elderSign" />;
			}
			if (item === "fail") {
				return <C.AutoFail type="autoFail" />;
			}
			const type: ChaosTokenType = fail ? "autoFail" : "elderSign";
			return <C.Value value={item} type={type} scale={false} />;
		},
		[fail],
	);

	return <C.Control data={data} renderItem={renderItem} value={value} />;
};
