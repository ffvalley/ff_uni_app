/**
 * 跳转应用内页面路由类型集合
 * */
const routerType = {
	/**
	 * 保留当前页面，跳转到应用内的某个页面。
	 * */
	NAVIGATE_TO: 1,
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 * */
	REDIRECT_TO: 2,
	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 * */
	RELAUNCH: 3,
	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
	 * */
	SWITCH_TAB: 4
}

/**
 * @description 跳转应用内页面
 * @param {String} url = [应用内路径]
 * @param {Object} params = [请求参数]
 * @param {routerType} type = [路由类型]
 * */
function toPage(url, params, type) {
	console.log('toPage:', url)
	switch (type) {
		case routerType.NAVIGATE_TO:
			uni.navigateTo({
				url: url + dealParams(params)
			})
			break;
		case routerType.REDIRECT_TO:
			uni.redirectTo({
				url: url + dealParams(params)
			})
			break;
		case routerType.RELAUNCH:
			uni.reLaunch({
				url: url + dealParams(params)
			})
			break;
		case routerType.SWITCH_TAB:
			uni.switchTab({
				url: url + dealParams(params)
			})
			break;
	}
}

function dealParams(params) {
	let paramsStr = ''
	if (params) {
		paramsStr = '?'
		for (let i in params) {
			paramsStr += i + '=' + params[i] + '&'
		}
		return paramsStr.substr(0, paramsStr.length - 1)
	}
	return paramsStr
}

module.exports = {
	toPage,
	routerType
}
