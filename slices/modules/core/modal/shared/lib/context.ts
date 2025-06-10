import type { Nullable } from "@shared/model";
import { type MutableRefObject, createContext } from "react";
import type { ModalOkEvent } from "../model";

export type ModalEventHandlerType = Nullable<() => void>;
export type ModalOkEventHandlerType = Nullable<(event: ModalOkEvent) => void>;

export type ModalEventHandler = MutableRefObject<ModalEventHandlerType> | null;

export type ModalOkEventHandler =
	MutableRefObject<ModalOkEventHandlerType> | null;

export type ModalContextType = {
	onOk: ModalOkEventHandler;
	onCancel: ModalEventHandler;
	onClose: ModalEventHandler;
};

export const ModalContext = createContext<ModalContextType>({
	onCancel: null,
	onOk: null,
	onClose: null,
});
