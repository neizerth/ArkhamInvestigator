import type { BaseToastProps, ToastType } from "react-native-toast-message";
import * as C from "./Toast.components";

export type ToastProps = BaseToastProps & {
	type: ToastType;
};

export const Toast = (props: ToastProps) => {
	return (
		<C.Container type={props.type}>
			{props.text1 && <C.Text1 value={props.text1} />}
		</C.Container>
	);
};
