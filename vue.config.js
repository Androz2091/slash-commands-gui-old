module.exports = {
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap((args) => {
                // eslint-disable-next-line no-param-reassign
                args[0].title = 'Slash Commands GUI';
                return args;
            });
    }
};
