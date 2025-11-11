import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { Step5AfterTitle } from "../Step5AfterTitle";
import * as C from "./Step5Description.components";

export const Step5Description = () => {
	const tokens = useAppSelector(selectRevealedTokens);
	return (
		<C.Container>
			<C.Expression>
				{tokens.map((token, index) => {
					const isLast = index === tokens.length - 1;
					return (
						<C.Item key={token.id}>
							<C.Token token={token} position={index + 1} showValue />
							{!isLast && <C.Sign>+</C.Sign>}
						</C.Item>
					);
				})}
			</C.Expression>
			<C.Result>
				<C.Sign>=</C.Sign>
				<Step5AfterTitle />
			</C.Result>
		</C.Container>
	);
};
