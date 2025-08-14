import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
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
