module.exports = {
    'plugins': [
        [
            'postcss-pxtorem',
            {
                // 设计稿的宽除以10 就是 rootValue的值
                // 目的是为了好计算 1rem = 10px
                'rootValue': 37.5,
                'unitPrecision': 5,
                'propList': ['*'],
                'selectorBlackList': ['html'],
                'replace': true,
                'mediaQuery': false,
                'minPixelValue': 2,
                'exclude': file => {
                    return file.indexOf('_m.') === -1;
                },
            },
        ],
    ],
};
