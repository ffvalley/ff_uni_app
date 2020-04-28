<template>
	<view class="page-container">
		<view class="page-container">
			<view class="menu-list-container" v-if="bookList.length>0">
				<view class="item_container" v-for="(item, index) in bookList" :key='index'>
					<image class="icon" src="/static/img/me/icon_account_book.png"></image>
					<text class="title">{{item.bookName}}</text>
					<text class="num">参与 {{item.count}}人</text>
					<image class="next" src="/static/img/common/icon_next_right.png"></image>
				</view>
			</view>
			<view class="seat"></view>
			<view class="common-button-enable" style="width: 90%;" @tap="onShowDialog(true)">新建账本</view>
		</view>
		
		<view class="common-mongolia-container" v-if="isShowDialog" @tap="onShowDialog(false)">
			<view class="content-container">
				<view class="title">新建账本</view>
				<view class="content">
					<view>账本昵称</view>
					<input />
				</view>
				<view class="common-row-container" style="width: 600upx;">
					<view class="common-button-unable" style="flex: 1;">取消</view>
					<view class="common-button-enable" style="flex: 1;">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const net = require('../../../common/net/net.js');
	const api = require('../../../common/net/api.js');
	const netCode = require('../../../common/net/netCode.js');
	const enums = require('../../../common/enums.js');
	const router = require('../../../common/router.js');
	export default {
		data() {
			return {
				bookList: [],
				isShowDialog: false
			};
		},
		onShow() {
			this.netSelectAll()
		},
		methods: {
			// 查询所有账本
			netSelectAll: function() {
				let that = this
				net.requestJson(api.book.selectAll, null, net.methodType.post, () => {
					uni.showLoading({
						title: '正在加载',
					})
				}, (data) => {
					this.bookList = data
					uni.hideLoading()
				}, (res) => {})
			},
			// 显示Dialog
			onShowDialog: function(val) {
				this.isShowDialog = val
			},
			// 创建新账本
			onCreateBook: function() {

				let that = this
				let params = {
					// bookName: '测试账本-哈哈02'
				}
				net.requestForm(api.book.creatBook, params, net.methodType.post, () => {
					uni.showLoading({
						title: '正在加载',
					})
				}, (data) => {
					uni.hideLoading()
				}, (res) => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		height: 100vh;
		background: $uni-color-gray;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	// 占位符
	.seat {
		flex: 1;
		width: 100vw;
	}

	// 账本列表
	.menu-list-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10upx;

		.item_container {
			width: 100vw;
			height: 100upx;
			background: white;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 10upx;

			.icon {
				height: 35upx;
				width: 35upx;
				margin: 0 40upx;
			}

			.title {
				flex: 2;
				font-size: 30upx;
				color: $uni-color-black;
			}

			.num {
				flex: 1;
				font-size: 24upx;
				color: $uni-color-gray-dark;
				text-align: right;
			}

			.next {
				height: 28upx;
				width: 16upx;
				margin-right: 40upx;
				margin-left: 20upx;
			}
		}
	}

	// Dialog
	.content-container {
		width: 630upx;
		min-height: 640upx;
		background: $uni-color-white;
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.title {
			font-size: 32upx;
			font-weight: 600;
			color: $uni-color-black;
			margin: 40upx 0;
		}

		.content {
			flex: 1;
			width: 630upx;
		}
	}
</style>
