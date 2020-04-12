/**
 * 跳转页面
 * @url 页面地址（小程序路由页面）
 * @params 页面参数
 */
export function toPage(url, params) {
	console.log(url)
	if (params) {
		// let paramsStr = '?'
		// for (let i in params) {
		// 	paramsStr += i + '=' + params[i] + '&'
		// }
		// let newStr = paramsStr.substr(0, paramsStr.length - 1)
		uni.navigateTo({
			url: url + dealParams(params)
		})
	} else {
		uni.navigateTo({
			url: url
		})
	}
}

/**
 * 跳转页面（关闭当前页）
 * @url 页面地址（小程序路由页面）
 * @params 页面参数
 */
export function toPageWithClose(url, params) {
	if (params) {
		// let paramsStr = '?'
		// for (let i in params) {
		// 	paramsStr += i + '=' + params[i] + '&'
		// }
		// let newStr = paramsStr.substr(0, paramsStr.length - 1)
		// if (url == '/pages/tabber/home/home') { // 返回首页的时候关闭所有页面
		// 	uni.reLaunch({
		// 		url: url + newStr
		// 	})
		// } else {
		uni.redirectTo({
			url: url + dealParams(params)
		})
		// }
	} else {
		uni.redirectTo({
			url: url
		})
	}
}

/**
 * 跳转至小程序通用webview页面
 * @params 页面参数
 */
export function toWebview(params) {
	if (params) {
		// let paramsStr = '?'
		// for (let i in data) {
		// 	paramsStr += i + '=' + data[i] + '&'
		// }
		// let newStr = paramsStr.substr(0, paramsStr.length - 1)
		let pageUrl = '/pages/webView/webView' + dealParams(params)
		uni.navigateTo({
			url: pageUrl
		})
	}
}

/**
 * 跳转到小程序页面（可返回前一页吗）
 */
export function toPageWithBack(url, preUrl, preData) {
  if (preUrl) {
    app.globalData.preUrl = '/' + preUrl
  }
  if (preData) {
    app.globalData.preData = preData
  }
  uni.redirectTo({
    url: url
  })
}

function dealParams(params) {
	let paramsStr = '?'
	for (let i in params) {
		paramsStr += i + '=' + params[i] + '&'
	}
	return paramsStr.substr(0, paramsStr.length - 1)
}
