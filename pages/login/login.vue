<template>
	<view class="page-container">
		<view class="login-btn-container">
			<button class="login-btn" open-type="getUserInfo" @getuserinfo="onLogin">授权登录</button>
		</view>
	</view>
</template>

<script>
	const net = require('../../net/net.js');
	const api = require('../../net/api.js');
	const netCode = require('../../net/netCode.js');
	const enums = require('../../enum/enums.js');
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
			getAuthInfo:function(code){
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
				// net.formPost(api.wechat.login, params, () => {
				net.postRequest(api.wechat.login, params, () => {
					uni.showLoading({
						title: '正在加载',
					})
				}, (data) => {
					uni.hideLoading()
					uni.setStorageSync(enums.cacheKey.custInfo, data)
					if (!data.phone) {
						// getPhone()
					}
					console.log("api.wechat.login: ", data)
				}, (res) => {
					// uni.hideLoading()
				})
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

	.login-btn-container {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		margin-top: 10%;
	}

	.login-btn {
		font-size: 36upx;
		color: white;
		margin: 20upx;
		width: 90%;
		height: 90upx;
		background: linear-gradient(130deg, rgba(32, 193, 41, 1) 0%, rgba(50, 161, 56, 1) 100%);
		box-shadow: 0px 2px 4px 0px rgba(47, 167, 53, 0.5);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
