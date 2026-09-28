import { createSlice } from "@reduxjs/toolkit";
import { createRemoteReducer } from "../createRemoteReducer";

type State = { lastValue: unknown };

const slice = createSlice({
	name: "test",
	initialState: { lastValue: null } as State,
	reducers: {
		doThing: createRemoteReducer(
			(state: State, action: { payload: unknown }) => {
				state.lastValue = action.payload;
			},
			{ notify: "host" },
		),
	},
});

const { doThing } = slice.actions;

describe("createRemoteReducer", () => {
	it("defaults meta.remote to true when the payload has no remote flag", () => {
		const action = doThing({ x: 1 });
		expect(action.meta).toEqual({ notify: "host", remote: true });
	});

	it("respects an explicit remote:false on the payload", () => {
		const action = doThing({ remote: false, x: 1 });
		expect(action.meta).toEqual({ notify: "host", remote: false });
	});

	it("respects an explicit remote:true on the payload", () => {
		const action = doThing({ remote: true });
		expect(action.meta.remote).toBe(true);
	});

	it("keeps the payload untouched and passed through", () => {
		const action = doThing({ x: 42 });
		expect(action.payload).toEqual({ x: 42 });
	});

	it("merges the fixed options into meta alongside the derived remote flag", () => {
		const notifySlice = createSlice({
			name: "test2",
			initialState: {} as Record<string, never>,
			reducers: {
				withTarget: createRemoteReducer(
					(
						_state: Record<string, never>,
						_action: { payload: undefined },
					) => {},
					{
						notify: "reciever",
						targetNetworkId: "abc",
					},
				),
			},
		});
		const action = notifySlice.actions.withTarget(undefined);
		expect(action.meta).toEqual({
			notify: "reciever",
			targetNetworkId: "abc",
			remote: true,
		});
	});

	it("reduces state using the wrapped reducer", () => {
		const state = slice.reducer(undefined, doThing({ x: 7 }));
		expect(state.lastValue).toEqual({ x: 7 });
	});
});
