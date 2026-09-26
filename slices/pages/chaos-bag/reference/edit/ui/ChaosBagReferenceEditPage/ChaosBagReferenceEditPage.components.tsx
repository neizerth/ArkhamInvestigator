import { ContextModal } from "@modules/core/modal/shared/base/ui";
import { ReferenceSelect } from "@widgets/control/reference-select";
import styled from "styled-components/native";

export const Container: typeof ContextModal = styled(ContextModal).attrs(
	({ theme }) => ({
		contentStyle: {
			backgroundColor: theme.color.dark30,
			paddingRight: theme.size.gap.small,
			paddingLeft: theme.size.gap.small,
		},
	}),
)`
  justify-content: flex-start;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const Select: typeof ReferenceSelect = styled(ReferenceSelect)`
  
`;
