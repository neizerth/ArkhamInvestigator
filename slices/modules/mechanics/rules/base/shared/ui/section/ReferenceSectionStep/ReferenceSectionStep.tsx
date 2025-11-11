import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import type { TextProps, ViewProps } from "react-native";
import * as C from "./ReferenceSectionStep.components";

import { useBoolean } from "@shared/lib";
import { useCallback } from "react";

export type ReferenceSectionStepProps = Omit<
	TouchableOpacityProps,
	"onPress"
> & {
	contentContainerStyle?: ViewProps["style"];
	textStyle?: TextProps["style"];
	toggleStyle?: ViewProps["style"];
	title: string;
	index: number;
	color?: string;
	last?: boolean;
	afterText?: React.ReactNode;
	onPress?: (index: number) => void;
};

const colorMapping: Record<string, string | undefined> = {
	green: "#2b635e",
	red: "#8c110a",
};

export const ReferenceSectionStep = ({
	title,
	index,
	last = false,
	onPress,
	children,
	contentContainerStyle,
	textStyle,
	afterText,
	toggleStyle,
	...props
}: ReferenceSectionStepProps) => {
	const [open, setOpen] = useBoolean(false);
	const enabled = Boolean(onPress);
	const showToggle = Boolean(children);

	const handlePress = useCallback(() => {
		if (showToggle) {
			setOpen.toggle();
		}
		if (!onPress) {
			return false;
		}
		onPress(index);
	}, [index, onPress, setOpen.toggle, showToggle]);

	const color = props.color ? colorMapping[props.color] : props.color;

	return (
		<C.Container style={contentContainerStyle}>
			<C.Touchable {...props} enabled={enabled} onPress={handlePress}>
				<C.Content>
					<C.Text last={last} value={title} style={textStyle} />
					{afterText}
					{showToggle && (
						<C.Toggle open={open} style={toggleStyle}>
							<C.ToggleIcon icon="right-arrow" />
						</C.Toggle>
					)}
				</C.Content>
			</C.Touchable>
			{open && children}
			{color && <C.Background backgroundColor={color} />}
		</C.Container>
	);
};
