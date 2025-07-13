import { Outside } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./Modal.components";

export type ModalProps = ViewProps & {
	dark?: boolean;
	onClose?: () => void;
};
export const Modal = ({ children, onClose, dark, ...props }: ModalProps) => {
	return (
		<C.Container {...props}>
			<Outside onPress={onClose} />
			<C.Content dark={dark}>{children}</C.Content>
		</C.Container>
	);
};
