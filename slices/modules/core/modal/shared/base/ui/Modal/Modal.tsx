import { Outside } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./Modal.components";
import type { ModalBackgroundType } from "./Modal.types";

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
		<C.Container {...props}>
			<Outside onPress={onClose} />
			<C.Content type={type}>{children}</C.Content>
		</C.Container>
	);
};
