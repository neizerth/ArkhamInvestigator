import { setLanguage } from "@modules/core/i18n/shared/lib";
import { generateRandomNickname } from "@modules/core/network/entities/lib/store/features/generateRandomNickname";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { generateRandomNicknameOnLanguageSaga } from "../generateRandomNicknameOnLanguageSaga";

describe("generateRandomNicknameOnLanguageSaga", () => {
	it("regenerates the nickname whenever the language changes", () => {
		const tester = createSagaTester();
		tester.run(generateRandomNicknameOnLanguageSaga);

		tester.dispatch(setLanguage("ru" as never));

		expect(tester.ofType(generateRandomNickname.type)).toHaveLength(1);
	});
});
