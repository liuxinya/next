const path = require('path');
const withLess = require("next-with-less");
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess(withLess({
    webpack(config) {
        return config;
    },
}));