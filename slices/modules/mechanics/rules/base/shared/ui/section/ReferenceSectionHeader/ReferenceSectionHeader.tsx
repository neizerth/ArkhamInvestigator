import type { TitleProps } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceSectionHeader.components";

export type ReferenceSectionHeaderProps = TitleProps & {
	contentContainerStyle?: ViewProps["style"];
	open?: boolean;
	onToggle?: () => void;
	before?: React.ReactNode;
	after?: React.ReactNode;
};

export const ReferenceSectionHeader = ({
	contentContainerStyle,
	open = false,
	onToggle,
	before,
	after,
	...props
}: ReferenceSectionHeaderProps) => {
	return (
		<C.Container>
			{before}
			<C.Toggle onPress={onToggle}>
				<C.Title open={open} {...props} />
				<C.ToggleIconContainer open={open}>
					<C.ToggleIcon icon="right-arrow" />
				</C.ToggleIconContainer>
			</C.Toggle>
			{after}
		</C.Container>
	);
};
