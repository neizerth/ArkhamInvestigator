// export type SkillCheckPickerItem = {
// 	label: string;
// 	value: ChaosTokenValue | null;
// };

export type SkillCheckPickerItem = {
	type: "fail" | "success" | "value";
	failed: boolean;
	value: number;
	succeedBy: number;
};
