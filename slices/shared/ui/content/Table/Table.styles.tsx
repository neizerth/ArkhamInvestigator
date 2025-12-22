import { isObject } from "ramda-adjunct";
import type { ReactNode } from "react";
import type { ListRenderItem, ViewStyle } from "react-native";
import { REMOVE_CLIPPED_SUBVIEWS } from "slices/shared/config";
import * as C from "./Table.components";
import type {
	TableCellRendererOptions,
	TableDataRendererOptions,
	TableHeadRendererOptions,
	TableRowRendererOptions,
} from "./Table.types";

const defaultColumnStyle: ViewStyle = { flex: 1 };

export function defaultTableRenderCell({
	value,
	index,
	style,
	textStyle,
}: TableCellRendererOptions) {
	const content = isObject(value) ? (
		value
	) : (
		<C.TDContent style={textStyle}>{value}</C.TDContent>
	);

	return (
		<C.TD key={index} style={style}>
			{content}
		</C.TD>
	);
}

export function defaultTableRenderHeader({
	value,
	index,
	style,
	textStyle,
}: TableCellRendererOptions) {
	const content = isObject(value) ? (
		value
	) : (
		<C.THContent style={textStyle}>{value}</C.THContent>
	);

	return (
		<C.TH key={index} style={style}>
			{content}
		</C.TH>
	);
}

export function defaultTableRenderRow({
	data,
	index,
	renderCell = defaultTableRenderCell,
	style,
	cellStyle,
	cellTextStyle,
	columnStyles,
}: TableRowRendererOptions) {
	return (
		<C.TR key={index} style={style}>
			{data.map((value, index) =>
				renderCell({
					value,
					index,
					textStyle: cellTextStyle,
					style: {
						...(columnStyles?.[index] ?? defaultColumnStyle),
						...cellStyle,
					},
				}),
			)}
		</C.TR>
	);
}

export function defaultTableRenderFlatData({
	data,
	renderCell = defaultTableRenderCell,
	renderRow = defaultTableRenderRow,
	style,
	rowStyle,
	cellStyle,
	cellTextStyle,
	columnStyles,
}: TableDataRendererOptions) {
	const renderItem: ListRenderItem<ReactNode[]> = ({ item, index }) =>
		renderRow({
			data: item,
			index,
			renderCell,
			style: rowStyle,
			cellStyle,
			cellTextStyle,
			columnStyles,
		});

	return (
		<C.TFlatBody
			data={data}
			renderItem={renderItem}
			removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
			style={style}
		/>
	);
}

export function defaultTableRenderData({
	data,
	renderCell = defaultTableRenderCell,
	renderRow = defaultTableRenderRow,
	style,
	rowStyle,
	cellStyle,
	cellTextStyle,
	columnStyles,
}: TableDataRendererOptions) {
	return (
		<C.TBody style={style}>
			{data.map((data, index) =>
				renderRow({
					data,
					index,
					renderCell,
					style: rowStyle,
					cellStyle,
					cellTextStyle,
					columnStyles,
				}),
			)}
		</C.TBody>
	);
}

export function defaultTableRenderHead({
	headers,
	columnStyles,
	style,
	headerStyle,
	headerTextStyle,
	renderHeader = defaultTableRenderHeader,
}: TableHeadRendererOptions) {
	return (
		<C.TR style={style}>
			{headers.map((value, index) =>
				renderHeader({
					value,
					index,
					textStyle: headerTextStyle,
					style: {
						...(columnStyles?.[index] ?? defaultColumnStyle),
						...headerStyle,
					},
				}),
			)}
		</C.TR>
	);
}
