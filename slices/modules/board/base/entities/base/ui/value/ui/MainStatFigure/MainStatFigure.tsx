import { selectShowInitialHealthAndSanity } from "@modules/board/base/shared/lib";
import { selectPickerScale } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorMainStatType } from "@shared/model";
import type { ValueProps } from "@shared/ui";
import type { FC, PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { backgroundByStat, byStatAndSize } from "./MainStatFigure.components";
import {
	getFigureSize,
	getFigureStyle,
	mainStatSizes,
	mainStatStyles,
} from "./MainStatFigure.styles";
import type { MainStatSize } from "./MainStatFigure.types";

export type MainStatFigureProps = PropsWithChildren & {
	stat: InvestigatorMainStatType;
	/** small is the compact value, medium is the board stat */
	size?: MainStatSize;
	/** the number renderer of the calling side: stroked and white, or plain and colored */
	Value: FC<ValueProps>;
	initialValue?: number;
	/** overrides the setting: the board also shows the badge with additional information */
	showInitial?: boolean;
	style?: ViewProps["style"];
};

/**
 * The health and sanity asset with whatever the caller draws inside it, plus the initial
 * value badge. Only the size token and the number renderer differ between the board and
 * the compact variant.
 */
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
	const Background = backgroundByStat[stat];
	const { ratio } = mainStatStyles[stat];
	const token = mainStatSizes[size];

	const showInitialSetting = useAppSelector(selectShowInitialHealthAndSanity);
	const pickerScale = useAppSelector(selectPickerScale);

	const withInitial = showInitial ?? showInitialSetting;

	const imageStyle = getFigureSize({ token, ratio, scale: pickerScale });
	const sizeStyle = getFigureStyle(token, imageStyle);

	return (
		<Background
			testID={`${stat}-background`}
			style={[sizeStyle, style]}
			imageStyle={imageStyle}
		>
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
		</Background>
	);
};
