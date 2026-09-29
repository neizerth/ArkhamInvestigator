const WINDOW_MS = 60_000;

/**
 * Fake timers, with every test starting a minute after the previous one.
 * For code that throttles via module-level `Date.now()` state: it keeps its state across tests
 * in a file, so each test must start past the previous test's throttle window.
 */
export const useFreshFakeClock = () => {
	let clock = Date.now();

	beforeEach(() => {
		jest.useFakeTimers();
		clock += WINDOW_MS;
		jest.setSystemTime(clock);
	});

	afterEach(() => {
		jest.useRealTimers();
	});
};
