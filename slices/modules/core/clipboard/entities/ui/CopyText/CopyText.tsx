import { setClipboardContents } from "@modules/core/clipboard/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { UnscaledText } from "@shared/ui";
import { useCallback } from "react";
import type { GestureResponderEvent, TextProps } from "react-native";

export type CopyTextProps = TextProps & {
	copyText?: string;
	copyMessage?: string;
};

export const CopyText = ({
	children,
	onPress: onPressProp,
	copyMessage = "clipboard.successCopy",
	copyText,
	...props
}: CopyTextProps) => {
	const dispatch = useAppDispatch();
	const text = copyText ?? children?.toString();

	const handlePress = useCallback(
		async (e: GestureResponderEvent) => {
			onPressProp?.(e);
			if (!text) {
				return;
			}
			await setClipboardContents(text);

			dispatch(
				sendNotification({
					message: copyMessage,
					type: "success",
				}),
			);
		},
		[text, onPressProp, copyMessage, dispatch],
	);

	return (
		<UnscaledText {...props} onPress={handlePress}>
			{children}
		</UnscaledText>
	);
};
