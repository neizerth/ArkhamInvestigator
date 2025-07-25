import Toast, { type ToastShowParams } from "react-native-toast-message";

export type ShowToastOptions = ToastShowParams & {
	title?: string;
	image1?: string;
	image2?: string;
	message: string;
};

export const showToast = ({
	message,
	title,
	image1,
	image2,
	...props
}: ShowToastOptions) => {
	Toast.show({
		...props,
		text2: title,
		text1: message,
		props: {
			image1,
			image2,
		},
	});
};
