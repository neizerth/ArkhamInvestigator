import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import type { Defined } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import {
	type ListRenderItemInfo,
	Platform,
	type SectionListProps,
} from "react-native";
import { SignaturePreview } from "../SignaturePreview/SignaturePreview";
import * as C from "./SignaturePreviewList.components";

const ios = Platform.OS === "ios";
const removeClippedSubviews = REMOVE_CLIPPED_SUBVIEWS && !ios;

type OmitProps = "key" | "numColumns" | "renderItem" | "keyExtractor";

type Group = InvestigatorSignatureGroup[];

type SignaturePreviewListSection = {
	title?: string;
};

type RenderSectionHeaderProp = Defined<
	SignaturePreviewListProps["renderSectionHeader"]
>;

export type SignaturePreviewListProps = Omit<
	SectionListProps<Group, SignaturePreviewListSection>,
	OmitProps
> & {
	onChange: (item: InvestigatorSignatureGroup) => void;
	selected: string[];
	disabled: string[];
	selectedCount: Record<string, number>;
	size: number;
};

export const SignaturePreviewList = ({
	onChange,
	size,
	selected,
	disabled,
	selectedCount,
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
						const { image } = signature;
						return (
							<SignaturePreview
								key={group.id}
								onPress={toggleSelected(group)}
								faction={signature.faction_code}
								code={signature.code}
								imageVersion={image.version}
								imageId={image.id}
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
		[size, toggleSelected, selected, disabled, selectedCount],
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
			renderItem={renderItem}
			getItemLayout={getItemLayout}
			renderSectionHeader={renderSectionHeader}
			removeClippedSubviews={removeClippedSubviews}
		/>
	);
};
