// const baseUrl = 'http://localhost:8002/ff-basic/' // 基础URL
const baseUrl = 'https://www.ffvalley.com:8002/ff-basic/' // 基础URL

/**
 * 网络请求URL集合 - 微信小程序业务
 * */
const wechat = {
	login: baseUrl + "wechat/login", // 登录
}

module.exports = {
	wechat
}
