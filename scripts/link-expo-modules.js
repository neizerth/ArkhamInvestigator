#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const nodeModulesDir = path.join(projectRoot, "node_modules", "@expo-modules");
const grayscaleSource = path.join(projectRoot, "modules", "grayscale");
const grayscaleTarget = path.join(nodeModulesDir, "grayscale");

// Create @expo-modules directory if it doesn't exist
if (!fs.existsSync(nodeModulesDir)) {
	fs.mkdirSync(nodeModulesDir, { recursive: true });
}

// Remove existing symlink or directory
if (fs.existsSync(grayscaleTarget)) {
	if (fs.lstatSync(grayscaleTarget).isSymbolicLink()) {
		fs.unlinkSync(grayscaleTarget);
	}
}

// Create symlink
try {
	fs.symlinkSync(grayscaleSource, grayscaleTarget, "junction");
	console.log("✓ Linked @expo-modules/grayscale");
} catch (error) {
	console.error("Failed to link @expo-modules/grayscale:", error.message);
}

