const base = {
	preset: "jest-expo",
	resolver: "react-native-worklets/jest/resolver",
	testPathIgnorePatterns: ["/node_modules/", "/e2e/", "/.claude/worktrees/"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-native-svg|redux-toolkit-helpers|react-redux|mime/|standard-navigation)",
	],
	moduleNameMapper: {
		"^uuid$": "<rootDir>/node_modules/uuid/dist/cjs/index.js",
		"^slices/(.*)$": "<rootDir>/slices/$1",
	},
	setupFiles: ["<rootDir>/jest.setup.ts"],
	setupFilesAfterEnv: ["<rootDir>/jest.setupAfterEnv.ts"],
};

module.exports = {
	projects: [
		{
			// sagas, selectors, utils: `@shared/lib` is mocked globally (see jest.setup.logic.ts)
			...base,
			displayName: "logic",
			testMatch: ["<rootDir>/slices/**/*.test.ts"],
			setupFiles: [...base.setupFiles, "<rootDir>/jest.setup.logic.ts"],
		},
		{
			// components and hooks: the real `@shared/lib`
			...base,
			displayName: "ui",
			testMatch: ["<rootDir>/slices/**/*.test.tsx"],
		},
	],
};
