import type { I18NText } from "@modules/core/i18n/shared/model";
import type { Faction } from "@shared/model";

export type ModalType = "prompt" | "confirm" | "board-select" | "custom";

export type BaseModalData<Action, Data = unknown> = {
	title: I18NText;
	subtitle?: I18NText;
	faction?: Faction;
	actions: Action[];
	data?: Data;
};
