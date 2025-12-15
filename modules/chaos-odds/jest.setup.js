// Jest setup file for ChaosOdds module tests
// This file runs before each test file

// Mock global.ChaosOdds for tests that don't have native bindings
if (typeof global.ChaosOdds === "undefined") {
	global.ChaosOdds = {
		calculate: jest.fn((available, revealed) => {
			// Mock implementation - returns null to simulate unavailable native module
			return null;
		}),
		freeString: jest.fn((ptr) => {
			// Mock implementation
		}),
		cancel: jest.fn(() => {
			// Mock implementation
		}),
	};
}
