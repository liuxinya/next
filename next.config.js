const withPlugins = require('next-compose-plugins');
const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
    webpack(config) {
        if (process.env.NODE_ENV === 'complie') {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            });
        }
        return config;
    },
}
module.exports = withPlugins(
    [
        withAntdLess,
        withLess,
    ],
    nextConfig
);