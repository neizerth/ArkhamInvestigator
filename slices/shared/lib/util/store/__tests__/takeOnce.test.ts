import { createAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { createSagaTester, flush } from "../../../test/createSagaTester";
import { takeOnce } from "../takeOnce";

const started = createAction("test/started");
const handled = createAction<string>("test/handled");
const other = createAction("test/other");

describe("takeOnce", () => {
	it("handles only the first matching action and passes args before it", async () => {
		const tester = createSagaTester();

		function* worker(prefix: string, action: ReturnType<typeof started>) {
			yield put(handled(`${prefix}:${action.type}`));
		}

		tester.run(function* () {
			yield takeOnce(started.match, worker, "arg");
		});

		tester.dispatch(started());
		tester.dispatch(started());
		await flush();

		expect(tester.ofType(handled.type)).toEqual([handled("arg:test/started")]);
	});

	it("does not block the saga that declares it", async () => {
		const tester = createSagaTester();

		tester.run(function* () {
			yield takeOnce(started.match, function* () {});
			yield put(other());
		});
		await flush();

		expect(tester.ofType(other.type)).toHaveLength(1);
	});
});
