const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", "ts", "tsx"], // o x é para sinalizar que temos um componente dentro do arquivo, componente react, com html dentro de JS
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/, // arquivo termina com jsx? true or false / e a barra invertida é para caracterizar que o ponto é de fato um ponto, pois ele funciona como caractere especial
                exclude: /node_modules/, // por padrão os arquivos no node_modules já são arquivos prontos para ir pro browser, então não quero que ele faça conversão nesses arquivos
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            isDevelopment &&
                                require.resolve("react-refresh/babel"),
                        ].filter(Boolean),
                    },
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
