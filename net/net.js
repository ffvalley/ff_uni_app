const netCode = require('./netCode.js');
const enums = require('../enum/enums.js');

/**
 * 供外部POST请求调用
 */
function postRequest(url, params, onStart, onSuccess, onFailed) {
	request(url, params, "POST", onStart, onSuccess, onFailed)
}

/**
 * 供外部GET请求调用
 */
function getRequest(url, params, onStart, onSuccess, onFailed) {
	request(url, params, "GET", onStart, onSuccess, onFailed);
}

/**
 * function: 封装网络请求（JSON格式）
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onStart 开始请求,初始加载loading等处理
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */
function request(url, params, method, onStart, onSuccess, onFailed) {
	var data = uni.getStorageSync(enums.cacheKey.custInfo)
	var token = data.token

	onStart(); //request start
	uni.request({
		url: url,
		data: params,
		method: method,
		header: {
			'content-type': 'application/json',
			'token': token
		},
		success: function(res) {
			console.log(res.data)
			if (res.data.code) {
				if (res.data.code == enums.code.REQUEST_SUCCESS) {
					onSuccess(res.data.data);
				} else if (res.data.code === enums.code.REQUEST_TOKEN_INVALID) {
					// 重新登录处理
					let url = '/pages/login/login'
				} else {
					uni.showToast({
						title: '网络连接异常',
						icon: 'none'
					})
					onFailed(res.data);
				}
			} else {
				uni.showToast({
					title: '网络连接异常',
					icon: 'none'
				})
				onFailed(res.data);
			}
		},
		fail: function(error) {
			console.log(error)
			uni.showToast({
				title: '网络连接异常',
				icon: 'none'
			})
			onFailed(error);
		}
	})
}
/**
 * function: 封装网络请求（formdata格式）
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onStart 开始请求,初始加载loading等处理
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */
function formPost(url, params, onStart, onSuccess, onFailed) {
	var data = uni.getStorageSync(enums.cacheKey.custInfo)
	var token = data.token

	onStart()

	let str = ''
	for (let key in params) {
		str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + params[key] +
			'\r\n--XXX'
	}
	str += '--'

	uni.request({
		url: url,
		data: str,
		method: 'POST',
		header: {
			'content-type': 'multipart/form-data;boundary=XXX',
			'token': token
		},
		success: function(res) {
			if (res.data.code) {
				if (res.data.code === enums.code.REQUEST_SUCCESS) {
					onSuccess(res.data.data);
				} else if (res.data.code === enums.code.REQUEST_TOKEN_INVALID) {
					let url = '/pages/login/login'
				} else {
					uni.showToast({
						title: '网络连接异常',
						icon: 'none'
					})
					onFailed(res.data);
				}
			} else {
				uni.showToast({
					title: '网络连接异常',
					icon: 'none'
				})
				onFailed(res.data);
			}
		},

		fail: function(error) {
			console.log(error)
			uni.showToast({
				title: '网络连接异常',
				icon: 'none'
			})
			onFailed(error);
		}
	})
}

module.exports = {
	postRequest: postRequest,
	getRequest: getRequest,
	formPost: formPost
}
