import type { Faction } from "@shared/model";

export type ModalType = "faction";

export type ModalData = {
	title: string;
	subtitle?: string;
	text: string;
	okText?: string;
	cancelText?: string;
} & {
	type: "faction";
	faction?: Faction;
};
