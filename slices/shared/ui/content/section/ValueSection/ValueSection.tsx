import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ValueSection.components";

export type ValueSectionProps = ViewProps & {
	title: string;
	value?: ReactNode;
	showValue?: boolean;
};

export const ValueSection = ({
	title,
	children,
	value: valueProp,
	showValue = true,
	...props
}: ValueSectionProps) => {
	const { t } = useTranslation();
	const value = typeof valueProp === "string" ? t(valueProp) : valueProp;
	return (
		<C.Container {...props}>
			<C.Header>
				<C.Title>{title}</C.Title>
				{showValue && <C.Value>{value}</C.Value>}
			</C.Header>
			{children}
		</C.Container>
	);
};
