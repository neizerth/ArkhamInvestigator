import { Outside } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./Modal.components";

export type ModalProps = ViewProps & {
	onClose?: () => void;
};
export const Modal = ({ children, onClose, ...props }: ModalProps) => {
	return (
		<C.Container {...props}>
			<Outside onPress={onClose} />
			<C.Content>{children}</C.Content>
		</C.Container>
	);
};
