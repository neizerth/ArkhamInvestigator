import { copyText as copy } from "@modules/core/clipboard/entities/lib/store/features/copyText/copyText";
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
	copyMessage,
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
			dispatch(copy({ text, message: copyMessage }));
		},
		[text, onPressProp, copyMessage, dispatch],
	);

	return (
		<UnscaledText {...props} onPress={handlePress}>
			{children}
		</UnscaledText>
	);
};
