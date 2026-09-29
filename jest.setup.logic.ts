// Logic tests (sagas, selectors, utils) need only the `@shared/lib` utils and store helpers:
// the real index also pulls the whole UI (hooks, HOCs, components).
jest.mock("@shared/lib", () => require("@shared/lib/test/mocks").sharedLibMock());
