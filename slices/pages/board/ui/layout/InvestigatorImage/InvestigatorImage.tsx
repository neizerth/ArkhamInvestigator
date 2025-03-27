import { LayoutContext } from "@pages/board/config";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImage.components";
// import { useActiveStyle } from './useActiveStyle';

export type InvestigatorImageProps = ViewProps;

export const InvestigatorImage = ({ ...props }: InvestigatorImageProps) => {
	const { view, layout } = useContext(LayoutContext);

	return (
		<C.Container {...props} view={view}>
			<C.Content>
				<C.FactionBackground view={view} layout={layout} />
				{layout.type === "column" && <C.PortraitBackground />}
				{layout.type === "row" && <C.LandscapeBackground layout={layout} />}
			</C.Content>
		</C.Container>
	);
};
