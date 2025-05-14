import type { RowProps } from "@shared/ui";
import { Actions, Health, Sanity } from "../../../../../shared/stats";
import * as C from "./Footer.components";
import { useFooterStyle } from "./useFooterStyle";
export type FooterProps = RowProps;

export const Footer = ({ ...props }: FooterProps) => {
	const style = useFooterStyle();

	return (
		<C.Container {...props} style={[props.style, style.container]}>
			<C.Stats>
				<C.Investigator>
					<Actions />
				</C.Investigator>

				<C.MainStats>
					<Health />
					<Sanity />
				</C.MainStats>
			</C.Stats>
		</C.Container>
	);
};
