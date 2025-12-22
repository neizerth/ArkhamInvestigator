import type { ReactElement, ReactNode } from "react";
import type { TextStyle, ViewStyle } from "react-native";

export type TableCellRendererOptions = {
	value: ReactNode;
	index: number;
	style?: ViewStyle;
	textStyle?: TextStyle;
};
export type TableCellRenderer = (
	options: TableCellRendererOptions,
) => ReactElement;

export type TableHeaderRenderer = (
	options: TableCellRendererOptions,
) => ReactElement;

export type TableRowRendererOptions = {
	data: ReactNode[];
	renderCell?: TableCellRenderer;
	index: number;
	style?: ViewStyle;
	cellStyle?: ViewStyle;
	cellTextStyle?: TextStyle;
	columnStyles?: ViewStyle[];
};

export type TableRowRenderer = (
	options: TableRowRendererOptions,
) => ReactElement;

export type TableDataRendererOptions = {
	data: ReactNode[][];
	renderRow?: TableRowRenderer;
	renderCell?: TableCellRenderer;
	style?: ViewStyle;
	rowStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	cellTextStyle?: TextStyle;
	columnStyles?: ViewStyle[];
};

export type TableDataRenderer = (
	options: TableDataRendererOptions,
) => ReactElement;

export type TableHeadRendererOptions = {
	headers: ReactNode[];
	columnStyles?: ViewStyle[];
	style?: ViewStyle;
	headerStyle?: ViewStyle;
	headerTextStyle?: TextStyle;
	renderHeader?: TableHeaderRenderer;
};

export type TableHeadRenderer = (
	options: TableHeadRendererOptions,
) => ReactElement;
