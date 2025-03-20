import { color } from "@shared/config";
import type { PropsWithFaction } from "@shared/model/ui";
import { Image } from "react-native";
import type { ImageProps, ViewProps } from "react-native";
import * as C from "./FactionBacground.components";
import { factionPatternWidth, factionPatterns, patternHeight } from "./images";

export type FactionBackgroundProps = ViewProps &
	PropsWithFaction & {
		width: number;
		height: number;
	};

export const FactionBackground = (props: FactionBackgroundProps) => {
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
