import { actionImage } from "@assets/images/theme";
import styled from "styled-components/native";
import type { WithBackgroundComponentProps } from "../../../../lib/hoc";
import { ImageBackground } from "../../../image";

export type ActionProps = WithBackgroundComponentProps;

export const Action: typeof ImageBackground = styled(ImageBackground).attrs({
	source: actionImage,
})`
	justify-content: center;
	align-items: center;
`;
