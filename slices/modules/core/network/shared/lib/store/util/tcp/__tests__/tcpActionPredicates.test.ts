import { tcpActionReceived } from "@modules/core/network/shared/lib/store/actions";
import type { NetworkIncomeActionMeta } from "@modules/core/network/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { createTCPIncomeAction } from "../createTCPIncomeAction";
import { filterTCPIncomeAction } from "../filterTCPIncomeAction";
import { filterTCPMessageReceived } from "../filterTCPMessageReceived";
import { filterTCPOutcomeAction } from "../filterTCPOutcomeAction";
import { isTCPOutcomeAction } from "../isTCPOutcomeAction";

const testAction = createAction<{ value: number }>("test/action");

const wireMeta = (
	messageId: string,
	networkId = "n1",
): NetworkIncomeActionMeta => ({
	messageId,
	networkId,
	fromRemote: true,
	notify: "self",
	receivedAt: "2020-01-01T00:00:00.000Z",
});
const socket = {} as import("react-native-tcp-socket").default.Socket;

describe("createTCPIncomeAction", () => {
	it("stamps meta with source=tcp, fromRemote, notify=self, the socket, and a receivedAt timestamp", () => {
		const result = createTCPIncomeAction(
			{
				type: "test/action",
				payload: { value: 1 },
				meta: wireMeta("m1"),
			},
			socket,
		);

		expect(result.type).toBe("test/action");
		expect(result.payload).toEqual({ value: 1 });
		expect(result.meta).toMatchObject({
			messageId: "m1",
			networkId: "n1",
			fromRemote: true,
			notify: "self",
			source: "tcp",
			socket,
		});
		expect(typeof result.meta.receivedAt).toBe("string");
	});
});

describe("isTCPOutcomeAction / filterTCPOutcomeAction", () => {
	it("is true for a plain local action with no meta", () => {
		expect(isTCPOutcomeAction(testAction({ value: 1 }))).toBe(true);
	});

	it("is true for an action with meta but no 'remote' prop", () => {
		const action = { ...testAction({ value: 1 }), meta: { foo: "bar" } };
		expect(isTCPOutcomeAction(action)).toBe(true);
	});

	it("is false once meta.remote is present (already tagged as network-bound)", () => {
		const action = { ...testAction({ value: 1 }), meta: { remote: true } };
		expect(isTCPOutcomeAction(action)).toBe(false);
	});

	it("is false for an income action (received from the network) to avoid re-broadcast", () => {
		const income = createTCPIncomeAction(
			{
				type: "test/action",
				payload: { value: 1 },
				meta: wireMeta("m1"),
			},
			socket,
		);
		expect(isTCPOutcomeAction(income)).toBe(false);
	});

	it("is false for a non-action value", () => {
		expect(isTCPOutcomeAction(null)).toBe(false);
		expect(isTCPOutcomeAction("nope")).toBe(false);
	});

	it("filterTCPOutcomeAction combines a type matcher with the outcome check", () => {
		const filter = filterTCPOutcomeAction(testAction.match);
		expect(filter(testAction({ value: 1 }))).toBe(true);

		const other = createAction<{ value: number }>("test/other");
		expect(filter(other({ value: 1 }))).toBe(false);

		const remote = { ...testAction({ value: 1 }), meta: { remote: true } };
		expect(filter(remote)).toBe(false);
	});
});

describe("filterTCPIncomeAction", () => {
	it("is true only when both the type matches and the action came from the network", () => {
		const filter = filterTCPIncomeAction(testAction.match);
		const income = createTCPIncomeAction(
			{
				type: "test/action",
				payload: { value: 1 },
				meta: wireMeta("m1"),
			},
			socket,
		);
		expect(filter(income)).toBe(true);
	});

	it("is false when the type matches but the action is local (no tcp meta)", () => {
		const filter = filterTCPIncomeAction(testAction.match);
		expect(filter(testAction({ value: 1 }))).toBe(false);
	});

	it("is false when the action came from the network but the type doesn't match", () => {
		const filter = filterTCPIncomeAction(testAction.match);
		const income = createTCPIncomeAction(
			{
				type: "test/other",
				payload: { value: 1 },
				meta: wireMeta("m1"),
			},
			socket,
		);
		expect(filter(income)).toBe(false);
	});
});

describe("filterTCPMessageReceived", () => {
	it("matches tcpActionReceived only when it's an income action with the exact messageId", () => {
		const income = createTCPIncomeAction(
			{
				type: tcpActionReceived.type,
				payload: { messageId: "abc", type: "test/action" },
				meta: wireMeta("abc"),
			},
			socket,
		);
		expect(filterTCPMessageReceived("abc")(income)).toBe(true);
		expect(filterTCPMessageReceived("other")(income)).toBe(false);
	});

	it("rejects non-tcpActionReceived actions and non-income actions", () => {
		expect(filterTCPMessageReceived("abc")(testAction({ value: 1 }))).toBe(
			false,
		);
		expect(
			filterTCPMessageReceived("abc")(
				tcpActionReceived({ messageId: "abc", type: "test/action" }),
			),
		).toBe(false);
	});
});
