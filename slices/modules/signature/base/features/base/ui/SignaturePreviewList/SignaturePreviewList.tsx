import type { SignatureListProps } from "@modules/signature/base/entities/ui";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import type { Defined } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import { type ListRenderItemInfo, Platform } from "react-native";
import { SignaturePreview } from "../../../../entities/ui/SignaturePreview/SignaturePreview";
import * as C from "./SignaturePreviewList.components";
import { defaultContentContainerStyle } from "./SignaturePrveiewList.styles";

const ios = Platform.OS === "ios";
const removeClippedSubviews = REMOVE_CLIPPED_SUBVIEWS && !ios;

type Group = InvestigatorSignatureGroup[];

type RenderSectionHeaderProp = Defined<
	SignaturePreviewListProps["renderSectionHeader"]
>;

export type SignaturePreviewListProps = SignatureListProps;

export const SignaturePreviewList = ({
	onChange,
	size,
	selected,
	disabled,
	selectedCount,
	selectedImages,
	...props
}: SignaturePreviewListProps) => {
	const toggleSelected = useCallback(
		(item: InvestigatorSignatureGroup) => () => onChange(item),
		[onChange],
	);

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<Group>) => {
			return (
				<C.ItemRow>
					{item.map((group) => {
						const [signature] = group.signatures;
						const imageId =
							selectedImages[signature.code] ?? signature.image.id;
						return (
							<SignaturePreview
								key={group.id}
								onPress={toggleSelected(group)}
								faction={signature.faction_code}
								code={signature.code}
								imageId={imageId}
								size={size}
								selected={selected.includes(signature.code)}
								disabled={disabled.includes(signature.code)}
								selectedCount={selectedCount[signature.code]}
							/>
						);
					})}
				</C.ItemRow>
			);
		},
		[size, toggleSelected, selected, disabled, selectedCount, selectedImages],
	);

	const getItemLayout = useCallback(
		(_: unknown, index: number) => ({
			length: size,
			offset: size * index,
			index: index,
		}),
		[size],
	);

	const renderSectionHeader: RenderSectionHeaderProp = useCallback(
		({ section }) => {
			const { title, data } = section;

			if (!title || data.length === 0) {
				return null;
			}

			return (
				<C.Underline>
					<C.Title>{title}</C.Title>
				</C.Underline>
			);
		},
		[],
	);

	return (
		<C.Container
			{...props}
			contentContainerStyle={[
				defaultContentContainerStyle,
				props.contentContainerStyle,
			]}
			renderItem={renderItem}
			getItemLayout={getItemLayout}
			renderSectionHeader={renderSectionHeader}
			removeClippedSubviews={removeClippedSubviews}
			stickySectionHeadersEnabled={false}
		/>
	);
};
