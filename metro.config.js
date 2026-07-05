const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Wrap your default configuration and pass the path to your global CSS file
module.exports = withNativeWind(config, { input: "./global.css" });