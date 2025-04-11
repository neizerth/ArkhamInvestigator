import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import type { Faction } from "@shared/model";
import type {
	Investigator as InvestigatorMedia,
	InvestigatorSignature,
} from "arkham-investigator-data";
import { memo, useCallback } from "react";
import type {
	GestureResponderEvent,
	TouchableOpacityProps,
} from "react-native";
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon";
import * as C from "./InvestigatorPreview.components";

export type InvestigatorPreviewProps = TouchableOpacityProps & {
	investigator: InvestigatorSignature;
	media?: InvestigatorMedia;
	selected?: boolean;
	selectedCount?: number;
	imageId?: string;
	icon?: string;
	size: number;
	showIcon?: boolean;
	showOptionsInfo?: boolean;
};

export const InvestigatorPreview = ({
	showIcon = true,
	showOptionsInfo = true,
	investigator,
	selected,
	selectedCount = 0,
	icon,
	media,
	disabled,
	size,
	...props
}: InvestigatorPreviewProps) => {
	const imageId = props.imageId || investigator.code;
	const faction = investigator.faction_code as Faction;
	const uri = getImageUrl({
		code: imageId,
		type: "square",
	});
	const source = { uri };

	const showOptions = showOptionsInfo && (media?.variants || media?.skins);

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
			{showOptions && <C.OptionsInfo faction={faction} />}
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
