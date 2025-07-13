import { Outside } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./Modal.components";
import type { ModalBackgroundType } from "./Modal.types";

export type { ModalBackgroundType };

export type ModalProps = ViewProps & {
	type?: ModalBackgroundType;
	onClose?: () => void;
};
export const Modal = ({
	children,
	onClose,
	type = "light",
	...props
}: ModalProps) => {
	return (
		<C.Container {...props} type={type}>
			<Outside onPress={onClose} />
			<C.Content>{children}</C.Content>
		</C.Container>
	);
};
