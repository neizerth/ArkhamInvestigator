const pkg = require("./package.json");
const { versionCode } = require("./app.version.json");

const dev = process.env.MODE === "development";
const packageId = dev ? "com.arkhaminvestigator.dev" : "com.arkhaminvestigator";
const name = dev ? "AI Dev" : "Investigator";

module.exports = {
  expo: {
    name,
    slug: "arkham-investigator",
    version: pkg.version,
    icon: "./assets/images/icon1024.png",
    scheme: "inv",
    userInterfaceStyle: "dark",
    orientation: "default",
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: packageId,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#000",
      },
      package: packageId,
      versionCode,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-audio",
        {
          "microphonePermission": false,
          "backgroundAudio": false,
        },
      ],
      "expo-router",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#000",
        },
      ],
      "expo-asset",
      [
        "expo-navigation-bar",
        {
          // Prevent Android from applying a contrasting (often light) scrim behind
          // the 3-button navigation bar in edge-to-edge mode.
          enforceContrast: false,
          hidden: true,
        },
      ],
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "16.4",
          },
          android: {
            compileSdkVersion: 36,
            targetSdkVersion: 36,
            buildToolsVersion: "36.0.0",
            ndkVersion: "27.0.12077973",
            enableProguardInReleaseBuilds: false,
            enableShrinkResourcesInReleaseBuilds: false,
          },
        },
      ],
      "react-native-navigation-mode"
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "5adfba1a-a202-4ecb-8450-1079290f35b8",
      },
      logTcp: process.env.LOG_TCP === "true",
    },
  },
};
