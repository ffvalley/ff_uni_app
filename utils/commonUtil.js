
// 组装页面请求参数
export function dealParams(params) {
	let paramsStr = '?'
	for (let i in params) {
		paramsStr += i + '=' + params[i] + '&'
	}
	return paramsStr.substr(0, paramsStr.length - 1)
}
