const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const withAntdLess = require('next-plugin-antd-less');
const ESLintPlugin = require('eslint-webpack-plugin');

const nextConfig = {
    webpack(config) {
        if (process.env.NODE_ENV === 'complie') {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            });
        }
        config.plugins.push(new ESLintPlugin({
            exclude: ['node_modules', 'dist', '.next'],
            // 只对内容修改了的文件进行 lint，启动时跳过 lint 默认值 false
            lintDirtyModulesOnly: false,
            extensions: ['ts', 'tsx', 'js'],
        }));
        return config;
    },
};
module.exports = withPlugins(
    [
        withAntdLess,
        withLess,
    ],
    nextConfig
);
