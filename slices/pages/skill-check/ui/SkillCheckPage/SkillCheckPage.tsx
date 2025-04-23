import { Delay } from "@shared/ui";
import * as C from "./SkillCheckPage.components";
export const SkillCheckPage = () => {
	return (
		<C.Container>
			<C.Header />
			<Delay fallback={<C.Loader />}>
				<C.Display />
			</Delay>
			<C.Keyboard />
		</C.Container>
	);
};
