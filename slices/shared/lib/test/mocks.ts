/**
 * `@shared/lib` without hooks, UI and HOCs: sagas need only utils, while the index pulls the whole UI.
 * Usage: `jest.mock("@shared/lib", () => require("@shared/lib/test/mocks").sharedLibMock());`
 */
export const sharedLibMock = () => ({
	...jest.requireActual("@shared/lib/util"),
	...jest.requireActual("@shared/lib/store"),
});
