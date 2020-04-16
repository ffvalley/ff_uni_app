const netCode = require('./netCode.js');
const enums = require('../enums.js');
const router = require('../router.js');
/**
 * 网络请求类型
 * */
const methodType = {
	/**
	 * Get网络请求
	 * */
	get: 'GET',
	/**
	 * Post网络请求
	 * */
	post: 'POST'
}

/**
 * @description JSON格式网络请求
 * @param {String} url = [请求URL]
 * @param {Object} params = [请求参数]
 * @param {methodType} method = [请求方法类型]
 * @param {function} onStart = [开始请求, 初始加载loading等处理]
 * @param {function} onSuccess = [成功回调]
 * @param {function} onFailed = [失败回调]
 * */
function requestJson(url, params, method, onStart, onSuccess, onFailed) {
	var data = uni.getStorageSync(enums.cacheKey.CUST_INFO)
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
				if (res.data.code == netCode.REQUEST_SUCCESS) {
					onSuccess(res.data.data);
				} else if (res.data.code === netCode.REQUEST_TOKEN_INVALID) {
					let url = '/pages/login/login'
					router.toPage(url, null, router.routerType.REDIRECT_TO)
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
 * @description JSON格式网络请求
 * @param {String} url = [请求URL]
 * @param {Object} params = [请求参数]
 * @param {methodType} method = [请求方法类型]
 * @param {function} onStart = [开始请求, 初始加载loading等处理]
 * @param {function} onSuccess = [成功回调]
 * @param {function} onFailed = [失败回调]
 * */
function requestForm(url, params, method, onStart, onSuccess, onFailed) {
	var data = uni.getStorageSync(enums.cacheKey.CUST_INFO)
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
		method: method,
		header: {
			'content-type': 'multipart/form-data;boundary=XXX',
			'token': token
		},
		success: function(res) {
			if (res.data.code) {
				if (res.data.code === netCode.REQUEST_SUCCESS) {
					onSuccess(res.data.data);
				} else if (res.data.code === netCode.REQUEST_TOKEN_INVALID) {
					let url = '/pages/login/login'
					router.toPage(url, null, router.routerType.REDIRECT_TO)
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
	requestJson,
	requestForm,
	methodType
}
