module.exports = {
    plugins:[
        require('autoprefixer')({
            browsers:[
                "> 10%",
                "last 7 versions",
                "ie >= 9",
                "firefox >= 20"
            ]
        })
    ]
}