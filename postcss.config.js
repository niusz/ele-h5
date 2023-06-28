module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['Android >= 40.0', 'ios >= 7'],
        },
        'postcss-pxtorem': {
            // 根节点的fontSize 值
            rootValue: 16,
            propList: ['*'],
            selectorBlackList: [':root'],
        }
    }
}