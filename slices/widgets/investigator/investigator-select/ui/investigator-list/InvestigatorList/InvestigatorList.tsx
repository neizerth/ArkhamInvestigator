import type { Defined, InvestigatorDetails } from "@shared/model";
import { useCallback } from "react";
import type { ListRenderItemInfo, SectionListProps } from "react-native";
import { useImageSize } from "../../../lib";
import * as C from "./InvestigatorList.components";

type OmitProps = "key" | "numColumns" | "renderItem" | "keyExtractor";

type Group = InvestigatorDetails[];
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
	onChange: (item: InvestigatorDetails) => void;
};

export const InvestigatorList = ({
	onChange,
	...props
}: InvestigatorListProps) => {
	const toggleSelected = useCallback(
		(item: InvestigatorDetails) => () => onChange(item),
		[onChange],
	);

	const size = useImageSize();

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<Group>) => {
			return (
				<C.ItemRow>
					{item.map((item) => (
						<C.Item
							key={item.investigator.code}
							onPress={toggleSelected(item)}
							investigator={item.investigator}
							media={item.media}
							size={size}
						/>
					))}
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
		/>
	);
};
