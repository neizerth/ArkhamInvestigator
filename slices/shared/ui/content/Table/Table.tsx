import type { ReactNode } from "react";
import type { TextStyle, ViewStyle } from "react-native";
import * as C from "./Table.components";
import {
	defaultTableRenderCell,
	defaultTableRenderFlatData,
	defaultTableRenderHead,
	defaultTableRenderHeader,
	defaultTableRenderRow,
} from "./Table.styles";
import type {
	TableCellRenderer,
	TableDataRenderer,
	TableHeadRenderer,
	TableHeaderRenderer,
	TableRowRenderer,
} from "./Table.types";

export type TableHeader = {
	value: string;
	style?: ViewStyle;
};

export type TableProps = {
	renderData?: TableDataRenderer;
	renderRow?: TableRowRenderer;
	renderCell?: TableCellRenderer;
	renderHeader?: TableHeaderRenderer;
	renderHead?: TableHeadRenderer;

	contentContainerStyle?: ViewStyle;
	headStyle?: ViewStyle;
	headerStyle?: ViewStyle;
	headerTextStyle?: TextStyle;
	cellStyle?: ViewStyle;
	cellTextStyle?: TextStyle;
	bodyStyle?: ViewStyle;
	rowStyle?: ViewStyle;

	headers: ReactNode[];
	data: ReactNode[][];
	columnStyles?: ViewStyle[];
};

export function Table<T>({
	headers,
	data,
	renderHeader = defaultTableRenderHeader,
	renderCell = defaultTableRenderCell,
	renderRow = defaultTableRenderRow,
	renderData = defaultTableRenderFlatData,
	renderHead = defaultTableRenderHead,

	contentContainerStyle,
	headStyle,
	headerStyle,
	headerTextStyle,
	bodyStyle,
	columnStyles,
	rowStyle,
	cellStyle,
	cellTextStyle,
}: TableProps) {
	return (
		<C.Container style={contentContainerStyle}>
			{renderHead({
				headers,
				columnStyles,
				style: headStyle,
				headerTextStyle,
				headerStyle,
				renderHeader,
			})}
			{renderData({
				data,
				renderRow,
				renderCell,
				style: bodyStyle,
				rowStyle,
				cellStyle,
				cellTextStyle,
				columnStyles,
			})}
		</C.Container>
	);
}
