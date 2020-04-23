<template>
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
		<view class="btn-container" @tap="onCreateBook">
			新建账本
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
				bookList: []
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
	}

	// 新建按钮
	.btn-container {
		width: 90%;
		height: 90upx;
		margin: 20upx;
		background: linear-gradient(130deg, $uni-color-green-light 0%, $uni-color-green 100%);
		box-shadow: 0 4upx 8upx 0 $uni-color-green-shadow;
		border-radius: $uni-border-radius;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: $uni-font-size-large;
		color: $uni-color-white;
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
</style>
