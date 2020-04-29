<template>
	<view class="no-data-container">
		<image class="img" :src="imageUrl"></image>
		<view class="desc">{{desc}}</view>
	</view>
</template>

<script>
	export default {
		//初始默认值
		props: {
			imageUrl: {
				type: String,
				value: '/static/img/common/icon_is_null.png'
			},
			desc: {
				type: String,
				value: '抱歉，没有搜索记录哦'
			}
		},
		data() {
			return {};
		},
		created() {},
		onReady: function() {},
		methods: {
			// onRefresh: function(e) {
			// 	//发送事件监听
			// 	this.$emit('onRefresh', this.checkDays);
			// }
		}
	}
</script>

<style lang="scss">
	// 无数据状态
	.no-data-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.img {
			width: 200upx;
			height: 200upx;
		}

		.desc {
			font-size: 24upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 34upx;
			margin-top: 40upx;
		}
	}
</style>
