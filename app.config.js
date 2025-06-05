const pkg = require("./package.json");

const dev = process.env.MODE === "development";
const packageId = dev ? "com.arkhaminvestigator.dev" : "com.arkhaminvestigator";
const icon = dev
  ? "./assets/images/icon1024-dev.png"
  : "./assets/images/icon1024.png";

const androdIcon = dev
  ? "./assets/images/icon1024-dev.png"
  : "./assets/images/icon.png";

module.exports = {
  expo: {
    name: "Investigator",
    slug: "arkham-investigator",
    version: pkg.version,
    orientation: "portrait",
    icon,
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
        foregroundImage: androdIcon,
        backgroundColor: "#000",
      },
      package: packageId,
      versionCode: 311,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-audio",
      "expo-router",
      "expo-notifications",
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
