import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import type { ViewProps } from "react-native";
import { selectSkillTestReferenceTitle } from "../../../shared/lib";
import * as C from "./SkillTestReference.components";

export type SkillTestReferenceProps = ViewProps;

export const SkillTestReference = (props: SkillTestReferenceProps) => {
	const title = useAppSelector(selectSkillTestReferenceTitle);

	if (!title) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleContent>{title}</C.TitleContent>
				</C.Title>
				<Delay>
					<C.Body>{""}</C.Body>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
