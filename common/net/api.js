const baseUrl = 'http://localhost:8002/ff-basic/' // 基础URL
// const baseUrl = 'https://www.ffvalley.com:8002/ff-basic/' // 基础URL

/**
 * 网络请求URL集合 - 微信小程序业务
 * */
const wechat = {
	login: baseUrl + "wechat/login", // 登录
}
const book = {
	creatBook: baseUrl + "book/creatBook", // 创建账本
	selectAll: baseUrl + "book/selectByUser", // 查询所有账本
}

module.exports = {
	wechat,
	book
}
