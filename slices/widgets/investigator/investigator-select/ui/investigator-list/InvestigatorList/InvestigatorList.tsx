import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import type { Defined } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ListRenderItemInfo, SectionListProps } from "react-native";
import { useImageSize } from "../../../lib";
import * as C from "./InvestigatorList.components";

type OmitProps = "key" | "numColumns" | "renderItem" | "keyExtractor";

type Group = InvestigatorSignatureGroup[];
type InvestigatorListSection = {
	title?: string;
};
type RenderSectionHeaderProp = Defined<
	InvestigatorListProps["renderSectionHeader"]
>;

export type InvestigatorListProps = Omit<
	SectionListProps<Group, InvestigatorListSection>,
	OmitProps
> & {
	onChange: (item: InvestigatorSignatureGroup) => void;
};

export const InvestigatorList = ({
	onChange,
	...props
}: InvestigatorListProps) => {
	const toggleSelected = useCallback(
		(item: InvestigatorSignatureGroup) => () => onChange(item),
		[onChange],
	);

	const size = useImageSize();

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<Group>) => {
			return (
				<C.ItemRow>
					{item.map((group) => {
						const [signature] = group.signatures;
						const { image } = signature;
						return (
							<C.Item
								key={group.id}
								onPress={toggleSelected(group)}
								faction={signature.faction_code}
								code={signature.code}
								imageVersion={image.version}
								imageId={image.id}
								size={size}
							/>
						);
					})}
				</C.ItemRow>
			);
		},
		[size, toggleSelected],
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

			return <C.Separator>{title}</C.Separator>;
		},
		[],
	);

	return (
		<C.Container
			{...props}
			renderItem={renderItem}
			getItemLayout={getItemLayout}
			renderSectionHeader={renderSectionHeader}
			removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
		/>
	);
};
