import type { Faction } from "@shared/model";

export type ModalType = "prompt" | "confirm" | "custom";

export type BaseModalData<Action> = {
	title: string;
	subtitle?: string;
	faction?: Faction;
	actions: Action[];
};

// export type CustomModalBaseData = {
// 	type: "custom";
// };

// export type CustomModalData = BaseModalData & CustomModalBaseData;

// export type TextModalBaseData = {
// 	type: "text";
// 	text: string;
// };

// export type TextModalData = BaseModalData & TextModalBaseData;

// export type PromptModalBaseData =

// export type PromptModalData<A = unknown> =  {
// 	type: "prompt";
// 	defaultValue?: string;
// 	inputMode?: InputModeOptions;
// 	keyboardType?: KeyboardType;
// 	text?: string;
// };

// export type SelectBoardModalData = BaseModalData & {
// 	type: "select-board";
// 	value: InvestigatorDetailItem<{ id: string }>[];
// 	disabled?: string[];
// 	text?: string;
// };
