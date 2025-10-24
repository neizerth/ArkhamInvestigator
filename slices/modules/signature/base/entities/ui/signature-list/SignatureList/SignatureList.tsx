import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import type { Defined } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ListRenderItemInfo, SectionListProps } from "react-native";
import { Platform } from "react-native";
import * as C from "./SignatureList.components";

const ios = Platform.OS === "ios";
const removeClippedSubviews = REMOVE_CLIPPED_SUBVIEWS && !ios;

type OmitProps = "key" | "numColumns" | "renderItem" | "keyExtractor";

type Group = InvestigatorSignatureGroup[];

export type SignaturePreviewListSection = {
	title?: string;
};

export type RenderSectionHeaderProp = Defined<
	SignatureListProps["renderSectionHeader"]
>;

export type SignatureListProps = Omit<
	SectionListProps<Group, SignaturePreviewListSection>,
	OmitProps
> & {
	onChange: (item: InvestigatorSignatureGroup) => void;
	selected: string[];
	disabled: string[];
	selectedCount: Record<string, number>;
	selectedImages: Record<string, string>;
	showIcons?: boolean;
	size: number;
};

export const SignatureList = ({
	onChange,
	size,
	selected,
	disabled,
	selectedCount,
	showIcons = false,
	...props
}: SignatureListProps) => {
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
						return (
							<C.Item
								key={group.id}
								onPress={toggleSelected(group)}
								signature={signature}
								selected={selected.includes(signature.code)}
								disabled={disabled.includes(signature.code)}
								selectedCount={selectedCount[signature.code]}
								showIcons={showIcons}
							/>
						);
					})}
				</C.ItemRow>
			);
		},
		[toggleSelected, selected, disabled, selectedCount, showIcons],
	);

	const renderSectionHeader: RenderSectionHeaderProp = useCallback(
		({ section }) => {
			const { title, data } = section;

			if (!title || data.length === 0) {
				return null;
			}

			return <C.SectionHeader>{title}</C.SectionHeader>;
		},
		[],
	);

	return (
		<C.Container
			{...props}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
			removeClippedSubviews={removeClippedSubviews}
		/>
	);
};
