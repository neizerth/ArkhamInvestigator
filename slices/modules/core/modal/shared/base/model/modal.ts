import type { Faction } from "@shared/model";

export type ModalType = "prompt" | "confirm" | "board-select" | "custom";

export type BaseModalData<Action> = {
	title: string;
	subtitle?: string;
	faction?: Faction;
	actions: Action[];
};
