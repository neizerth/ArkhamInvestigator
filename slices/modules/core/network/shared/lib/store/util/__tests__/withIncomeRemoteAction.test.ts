import { createAction } from "@reduxjs/toolkit";
import { withIncomeRemoteAction } from "../withIncomeRemoteAction";

const someAction = createAction<{ value: number }>("test/someAction");
const otherAction = createAction("test/otherAction");

describe("withIncomeRemoteAction", () => {
	const matchIncomeRemote = withIncomeRemoteAction(someAction.match);

	it("returns false when the action type does not match", () => {
		expect(matchIncomeRemote(otherAction())).toBe(false);
	});

	it("returns false when the action has no meta", () => {
		expect(matchIncomeRemote(someAction({ value: 1 }))).toBe(false);
	});

	it("returns false when meta.fromRemote is missing", () => {
		const action = { ...someAction({ value: 1 }), meta: {} };
		expect(matchIncomeRemote(action)).toBe(false);
	});

	it("returns false when meta.fromRemote is not exactly true", () => {
		const action = {
			...someAction({ value: 1 }),
			meta: { fromRemote: "true" },
		};
		expect(matchIncomeRemote(action)).toBe(false);
	});

	it("returns true when the action matches and meta.fromRemote is true", () => {
		const action = {
			...someAction({ value: 1 }),
			meta: { fromRemote: true },
		};
		expect(matchIncomeRemote(action)).toBe(true);
	});

	it("returns false for non-object, non-action input", () => {
		expect(matchIncomeRemote(null)).toBe(false);
		expect(matchIncomeRemote(undefined)).toBe(false);
		expect(matchIncomeRemote("nope")).toBe(false);
	});
});
