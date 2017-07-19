var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'style-loader', },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{ loader: 'postcss-loader' }
				]
			},
			{
				test: /\.(jpg|png|)$/,
				loader: 'file-loader',
				include: path.resolve(__dirname, 'app/images')
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [ new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
}