const webpack = require('webpack');
const config = require('./webpack.prod.config.js');
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora('正在打包').start();

webpack(config,(err, stats) => {
    spinner.stop();
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details)
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    // 这里处理完成
    console.log(
        chalk.green(
            stats.toString({
                chunks:false, // 使构建过程更静默无输出
                colors:true // 在控制台展示颜色
            })
        )
    )
})