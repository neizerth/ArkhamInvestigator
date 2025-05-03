import { useAppTranslation } from "@features/i18n";
import type { PropsWithChildren } from "react";
import { Container, Header, Title, Value } from "./DetailSection.components";

export type DetailSectionProps = PropsWithChildren & {
	title: string;
	value?: string;
};

export const DetailSection = ({
	title,
	children,
	...props
}: DetailSectionProps) => {
	const { t } = useAppTranslation();
	const value = t(props.value || "");
	return (
		<Container {...props}>
			<Header>
				<Title>{title}</Title>
				<Value>{value}</Value>
			</Header>
			{children}
		</Container>
	);
};
