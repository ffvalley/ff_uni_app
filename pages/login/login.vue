<template>
	<view class="page-container">

		<view class="userinfo-avatar">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<open-data type="userNickName" style="margin: 20upx 0 350upx 0"></open-data>

		<button class="common-button-enable login-btn" open-type="getUserInfo" @getuserinfo="onLogin">授权登录</button>
	</view>
</template>

<script>
	const net = require('../../common/net/net.js');
	const api = require('../../common/net/api.js');
	const netCode = require('../../common/net/netCode.js');
	const enums = require('../../common/enums.js');
	const router = require('../../common/router.js');
	const app = getApp();
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 微信小程序登录
			onLogin: function() {
				let that = this;
				let code = '';
				// 登录
				uni.login({
					success: res => {
						that.getAuthInfo(res.code)
					}
				})
			},
			// 微信小程序用户授权
			getAuthInfo: function(code) {
				let that = this
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								success: res => {
									var params = {
										code: code,
										encryptedData: res.encryptedData,
										iv: res.iv
									}
									that.netLogin(params);
								},
								fail: err => {
									uni.showModal({
										title: "温馨提示",
										showCancel: false,
										content: JSON.stringify(err)
									})
								}
							})
						}
					}
				})
			},
			// 私服用户登录
			netLogin: function(params) {
				let that = this;
				net.requestJson(api.wechat.login, params, net.methodType.post, () => {
					uni.showLoading({
						title: '正在加载',
					})
				}, (data) => {
					uni.hideLoading()
					uni.setStorageSync(enums.cacheKey.CUST_INFO, data)
					console.log("enums.cacheKey.CUST_INFO: ", uni.getStorageSync(enums.cacheKey.CUST_INFO))
					router.toPage('/pages/tabbar/home/home', null, router.routerType.SWITCH_TAB)
				}, (res) => {})
			},
		}
	}
</script>

<style>
	.page-container {
		display: flex;
		width: 100vw;
		/* #ifdef MP-WEIXIN*/
		height: 100vh;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.userinfo-avatar {
		overflow: hidden;
		display: block;
		width: 160upx;
		height: 160upx;
		margin: 20upx;
		margin-top: 50upx;
		border-radius: 50%;
		border: 4upx solid #fff;
		box-shadow: 6upx 6upx 20upx rgba(0, 0, 0, 0.2);
	}

	.login-btn {
		width: 90vw;
	}
</style>
