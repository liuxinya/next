const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
    webpack(config) {
        return config;
    },
}

module.exports = withPlugins(
    [
        withAntdLess,
        withLess,
        [optimizedImages, {
            handleImages: ['jpeg', 'png'],
            optimizeImages: false
        }],
    ],
    nextConfig
);