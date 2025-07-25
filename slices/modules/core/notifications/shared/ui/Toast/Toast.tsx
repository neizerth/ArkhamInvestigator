import type { BaseToastProps, ToastType } from "react-native-toast-message";
import * as C from "./Toast.components";

export type ToastProps = BaseToastProps & {
	type: ToastType;
	props: {
		image1?: string;
		image2?: string;
	};
};

export const Toast = ({ type, text1, ...restProps }: ToastProps) => {
	const { image1, image2 } = restProps.props;
	return (
		<C.Container type={type}>
			<C.Content>
				{image1 && <C.Img source={{ uri: image1 }} />}
				<C.Body>{text1 && <C.Text1 value={text1} />}</C.Body>
				{image2 && <C.Img source={{ uri: image2 }} />}
			</C.Content>
		</C.Container>
	);
};
