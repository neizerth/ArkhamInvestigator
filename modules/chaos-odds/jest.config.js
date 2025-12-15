module.exports = {
	preset: "react-native",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.ts", "**/__tests__/**/*.tsx"],
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react",
				},
			},
		],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/__tests__/**",
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
