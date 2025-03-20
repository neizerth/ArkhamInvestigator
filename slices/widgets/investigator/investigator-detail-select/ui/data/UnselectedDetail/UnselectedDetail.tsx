import {
	Container,
	type ContainerElement,
	Icon,
} from "./UnselectedDetail.components";

export const UnselectedDetail: ContainerElement = (props) => {
	return (
		<Container {...props}>
			<Icon icon="blocked" />
		</Container>
	);
};
