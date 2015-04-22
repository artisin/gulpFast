var config = {};

config.publicDirectory = "./dist";
config.sourceDirectory = "./app";
config.publicAssets    = config.publicDirectory + "/assets";
config.sourceAssets    = config.sourceDirectory + "/assets";
config.publicTemp    = config.publicDirectory + "/.temp";

module.exports = config;
