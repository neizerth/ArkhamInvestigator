import type { Faction, InvestigatorDetailItem } from "@shared/model";
import type { InputModeOptions, KeyboardType } from "react-native";

export type ModalType = "faction";

type WithId = {
	id: number;
};

export type ModalData = {
	title: string;
	subtitle?: string;
	okText?: string;
	cancelText?: string;
} & {
	type: "faction";
	faction?: Faction;
} & (
		| {
				contentType: "text";
				text: string;
		  }
		| {
				contentType: "input";
				defaultValue?: string;
				inputMode?: InputModeOptions;
				keyboardType?: KeyboardType;
				text?: string;
		  }
		| {
				contentType: "board";
				value: InvestigatorDetailItem<WithId>[];
				disabled?: string[];
				text?: string;
		  }
	);

export type ModalOkEvent = {
	textValue: string | null;
	boardIndex: number | null;
};
