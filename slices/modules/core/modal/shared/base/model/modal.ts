import type { Faction } from "@shared/model";

export type ModalType = "prompt" | "confirm" | "custom";

export type BaseModalData<Action> = {
	title: string;
	subtitle?: string;
	faction?: Faction;
	actions: Action[];
};
