module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Inject NativeWind directly into the default Expo preset configuration
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // Reanimated plugin must always be listed last
    ],
  };
};