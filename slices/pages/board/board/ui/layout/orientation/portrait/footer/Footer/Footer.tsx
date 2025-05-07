import type { RowProps } from "@shared/ui";
import { Actions, Health, Sanity } from "../../../../../shared/stats";
import * as C from "./Footer.components";
export type FooterProps = RowProps;

export const Footer = ({ ...props }: FooterProps) => {
	return (
		<C.Container {...props}>
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
