export type ModalOkEvent = {
	textValue: string | null;
	boardIndex: number | null;
};

export type ModalEventHandler = (() => void | boolean) | false;
export type ModalOkEventHandler =
	| ((event: ModalOkEvent) => void | boolean)
	| false;
