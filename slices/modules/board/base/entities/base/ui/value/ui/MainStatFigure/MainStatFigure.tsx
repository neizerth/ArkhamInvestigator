import { selectShowInitialHealthAndSanity } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ValueProps } from "@shared/ui";
import type { FC, PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { StatFigure, type StatSize } from "../StatFigure";
import { byStatAndSize } from "./MainStatFigure.components";
import { mainStatSizes } from "./MainStatFigure.styles";
import type { MainStatType } from "./MainStatFigure.types";

export type MainStatFigureProps = PropsWithChildren & {
	stat: MainStatType;
	size?: StatSize;
	/** the number renderer of the calling side: stroked and white, or plain and colored */
	Value: FC<ValueProps>;
	initialValue?: number;
	/** overrides the setting: the board also shows the badge with additional information */
	showInitial?: boolean;
	style?: ViewProps["style"];
};

/** the health and sanity asset with the initial value badge on its free corner */
export const MainStatFigure = ({
	stat,
	size = "small",
	Value,
	initialValue,
	showInitial,
	children,
	style,
}: MainStatFigureProps) => {
	const C = byStatAndSize[stat][size];
	const token = mainStatSizes[size];

	const showInitialSetting = useAppSelector(selectShowInitialHealthAndSanity);
	const withInitial = showInitial ?? showInitialSetting;

	return (
		<StatFigure stat={stat} size={size} style={style}>
			{children}
			{withInitial && typeof initialValue === "number" && (
				<C.Initial>
					{token.initialSeparator && <C.Separator />}
					<Value
						value={initialValue}
						style={{ fontSize: token.initialFontSize }}
					/>
				</C.Initial>
			)}
		</StatFigure>
	);
};
