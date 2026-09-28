import { i18n } from "@modules/core/i18n/shared/lib/store/i18n";
import { changeNickname } from "@modules/core/network/entities/lib/store/features/changeNickname";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { generateRandomNickname } from "../generateRandomNickname";
import { generateRandomNicknameSaga } from "../generateRandomNicknameSaga";

const reducer = combineReducers({ i18n: i18n.reducer });

const mockGetDefaultNickname = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getDefaultNickname: (language: unknown) => mockGetDefaultNickname(language),
	};
});

beforeEach(() => {
	mockGetDefaultNickname.mockReset().mockReturnValue("Faceless Investigator");
});

describe("generateRandomNicknameSaga", () => {
	it("generates a nickname for the current language and applies it via changeNickname", () => {
		const tester = createSagaTester({ reducer });
		tester.run(generateRandomNicknameSaga);

		tester.dispatch(generateRandomNickname());

		const changes = tester.ofType(changeNickname.type) as unknown as Array<{
			payload: string;
		}>;
		expect(changes).toHaveLength(1);
		expect(changes[0].payload).toBe("Faceless Investigator");
	});
});
