<template>
	<view class="content">
		<button type="primary" @tap="test">测试</button>
	</view>
</template>

<script>
	const net = require('../../../common/net/net.js');
	const api = require('../../../common/net/api.js');
	const netCode = require('../../../common/net/netCode.js');
	export default {
		data() {
			return {};
		},
		onLoad() {},
		methods: {
			test: function() {
				let that = this;
				let params = {};
				net.requestJson('http://localhost:8002/ff-basic/test/token', params, net.methodType.post, () => {
					uni.showLoading({
						title: '正在加载',
					})
				}, (data) => {
					uni.hideLoading()
				}, (res) => {})
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
