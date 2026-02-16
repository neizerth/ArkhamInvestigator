import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { Faction } from "@shared/model";
import { pick } from "ramda";
import Toast, { type ToastShowParams } from "react-native-toast-message";

export type ShowToastOptions = ToastShowParams & {
	title?: string;
	faction?: Faction;
	faction2?: Faction;
	image1?: string;
	image2?: string;
	token?: ChaosTokenType | null;
	message: string;
};

export const showToast = ({ message, title, ...props }: ShowToastOptions) => {
	const toastProps = pick(
		["image1", "image2", "faction", "faction2", "token"],
		props,
	);

	Toast.show({
		...props,
		text2: title,
		text1: message,
		props: toastProps,
	});
};
