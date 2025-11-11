import type { TitleProps } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSectionHeader.components";

export type ReferenceSectionHeaderProps = TitleProps & {
	contentContainerStyle?: ViewProps["style"];
	open?: boolean;
	onPress?: () => void;
	before?: React.ReactNode;
	after?: React.ReactNode;
	showToggle?: boolean;
};

export const ReferenceSectionHeader = ({
	contentContainerStyle,
	open = false,
	onPress,
	before,
	after,
	showToggle = false,
	...props
}: ReferenceSectionHeaderProps) => {
	const enabled = Boolean(onPress);

	return (
		<C.Container>
			{before}
			<C.Toggle onPress={onPress} enabled={enabled}>
				<C.Title open={open} {...props} />
				{showToggle && (
					<C.ToggleIconContainer open={open}>
						<C.ToggleIcon icon="right-arrow" />
					</C.ToggleIconContainer>
				)}
			</C.Toggle>
			{after}
		</C.Container>
	);
};
