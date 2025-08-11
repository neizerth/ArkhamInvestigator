import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

// export type SkillCheckPickerItem = {
// 	label: string;
// 	value: ChaosTokenValue | null;
// };

export type SkillCheckPickerItem = {
	type: "success" | "fail";
	value: ChaosTokenValue;
	succeedBy: number;
};
