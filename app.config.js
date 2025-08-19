const pkg = require("./package.json");

const dev = process.env.MODE === "development";
const packageId = dev ? "com.arkhaminvestigator.dev" : "com.arkhaminvestigator";
const name = dev ? "AI Dev" : "Investigator";

module.exports = {
  expo: {
    name,
    slug: "arkham-investigator",
    version: pkg.version,
    orientation: "portrait",
    icon: "./assets/images/icon1024.png",
    scheme: "arkham-investigator",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: packageId,
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#000",
      },
      package: packageId,
      versionCode: 327,
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-audio",
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
    },
  },
};
