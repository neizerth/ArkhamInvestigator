import { ContextModal } from "@features/modal";
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
  flex: 1;
  justify-content: flex-start;
`;

export const Select: typeof ReferenceSelect = styled(ReferenceSelect)`
  
`;
