import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import type { PropsWithFaction } from "@shared/model";
import { memo, useCallback } from "react";
import type {
	GestureResponderEvent,
	TouchableOpacityProps,
} from "react-native";
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon";
import * as C from "./InvestigatorPreview.components";

export type InvestigatorPreviewProps = TouchableOpacityProps &
	PropsWithFaction & {
		imageId?: string;
		selected?: boolean;
		selectedCount?: number;
		code: string;
		icon?: string;
		size: number;
		showIcon?: boolean;
		showOptionsInfo?: boolean;
	};

export const InvestigatorPreview = ({
	showIcon = true,
	showOptionsInfo = true,
	faction,
	selected,
	selectedCount = 0,
	icon,
	disabled,
	size,
	...props
}: InvestigatorPreviewProps) => {
	const imageId = props.imageId || props.code;
	const uri = getImageUrl({
		code: imageId,
		type: "square",
	});
	const source = { uri };

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			if (disabled) {
				return;
			}
			props.onPress?.(event);
		},
		[props.onPress, disabled],
	);

	const containerStyle = {
		width: size,
		height: size,
	};

	return (
		<C.Container
			{...props}
			onPress={onPress}
			style={[props.style, containerStyle]}
		>
			<C.Image source={source} size={size} />
			{showIcon && (
				<C.Info>
					{icon ? (
						<C.ExtraIcon icon={icon} />
					) : (
						<FactionIcon faction={faction} />
					)}
				</C.Info>
			)}
			{disabled && <C.DisabledOverlay />}
			{selected && <C.Selection faction={faction} />}
			{selectedCount > 1 && (
				<C.SelectedCount>
					<C.Count>{selectedCount}</C.Count>
				</C.SelectedCount>
			)}
		</C.Container>
	);
};

export const InvestigatorPreviewMemo = memo(InvestigatorPreview);
