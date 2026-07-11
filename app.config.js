// app.config.js
// Replaces app.json so we can inject environment variables at build time.
// Everything below is copied exactly from your existing app.json,
// with one addition: the `extra.rapidApiKey` field at the bottom.

export default {
  expo: {
    name: "PICKLE",
    slug: "PICKLE",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "pickle",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.PICKLE",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    // New: exposes the RapidAPI key to the app at runtime via expo-constants,
    // while the actual value lives in a git-ignored .env file, never in this file.
    extra: {
      rapidApiKey: process.env.RAPIDAPI_KEY,
    },
  },
};