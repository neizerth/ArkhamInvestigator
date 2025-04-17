import type { PropsWithFaction } from "@shared/model";
import type { ViewProps } from "react-native";
import { color } from "../../../../config";
import * as C from "./FactionSVGPattern.components";
import { factionPatternWidth, factionPatterns, patternHeight } from "./images";

export type FactionSVGPatternProps = ViewProps &
	PropsWithFaction & {
		width: number;
		height: number;
	};

export const FactionSVGPattern = (props: FactionSVGPatternProps) => {
	const { faction, width, height } = props;

	const Pattern = factionPatterns[faction];

	if (!Pattern) {
		return null;
	}

	const resizeMode = faction === "guardian" ? "stretch" : "repeat";
	const patternWidth = factionPatternWidth[faction];

	return (
		<C.Container {...props}>
			<C.Background
				patternId={`FactionBackground(${faction})`}
				width={width}
				height={height}
				patternWidth={patternWidth}
				patternHeight={patternHeight}
				resizeMode={resizeMode}
			>
				<Pattern color={color.white} />
			</C.Background>
		</C.Container>
	);
};
