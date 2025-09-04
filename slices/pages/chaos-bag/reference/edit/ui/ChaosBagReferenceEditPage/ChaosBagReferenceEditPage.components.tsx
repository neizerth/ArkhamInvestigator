import { ContextModal } from "@modules/core/modal/shared/base/ui";
import { color, size } from "@shared/config";
import { ReferenceSelect } from "@widgets/control/reference-select";
import styled from "styled-components/native";

export const Container: typeof ContextModal = styled(ContextModal).attrs({
	contentStyle: {
		backgroundColor: color.dark30,
		paddingRight: size.gap.small,
		paddingLeft: size.gap.small,
	},
})`
  justify-content: flex-start;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const Select: typeof ReferenceSelect = styled(ReferenceSelect)`
  
`;
