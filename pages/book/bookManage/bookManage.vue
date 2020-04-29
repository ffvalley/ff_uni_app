<template>
	<view class="page-container">
		<view class="page-container">
			<view class="menu-list-container" v-if="bookList.length>0">
				<view class="item_container" v-for="(item, index) in bookList" :key='index' @tap="toDetail(bookList[index].bookId)">
					<image class="icon" src="/static/img/me/icon_account_book.png"></image>
					<text class="title">{{item.bookName}}</text>
					<text class="num">参与 {{item.count}}人</text>
					<image class="next" src="/static/img/common/icon_next_right.png"></image>
				</view>
			</view>
			<view class="seat" v-if="bookList.length>0"></view>
			<Exception style='width: 100vw; flex: 1;' v-else :imageUrl="'../../static/img/common/icon_is_null.png'" :desc="'抱歉，您还没有账本哦'"
			 @tap='getAllBook'></Exception>
			<view class="common-button-enable" style="width: 90%;" @tap="onShowDialog">新建账本</view>
		</view>

		<view class="common-mongolia-container" v-if="isShowDialog">
			<view class="common-column-container content-container">
				<view class="title">新建账本</view>
				<view class="common-column-container content">
					<view class="common-tip-gray" style="width: 500upx;">账本昵称</view>
					<input class="common-input input" v-model="bookName" />
				</view>
				<view class="common-row-container" style="width: 600upx;">
					<view class="common-button-unable" style="flex: 1;" @tap="onDialog(0)">取消</view>
					<view class="common-button-enable" style="flex: 1;" @tap="onDialog(1)">确认</view>
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
	import Exception from "../../../ui/components/exception.vue"
	export default {
		components: {
			Exception, // 异常界面组件
		},
		data() {
			return {
				bookList: [],
				isShowDialog: false,
				bookName: '',
			};
		},
		onShow() {
			this.getAllBook()
		},
		methods: {
			// 查询所有账本
			getAllBook: function() {
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
			onShowDialog: function() {
				this.isShowDialog = true
			},
			// dialog的按钮事件
			onDialog: function(val) {
				if (val === 1) {
					this.onCreateBook(this.bookName)
				} else {
					this.isShowDialog = false
				}
			},
			// 创建新账本
			onCreateBook: function(bookName) {
				let that = this
				if (!bookName) {
					uni.showToast({
						title: '请输入账单名称',
						icon: 'none'
					})
				} else {
					that.isShowDialog = false
					let params = {
						bookName: bookName
					}
					net.requestForm(api.book.creatBook, params, net.methodType.post, () => {
						uni.showLoading({
							title: '正在加载',
						})
					}, (data) => {
						that.getAllBook()
						uni.hideLoading()
					}, (res) => {})
				}
			},
			toDetail: function(bookId) {
				console.log("toDetail - bookId - ", bookId)
				let params = {
					bookId: bookId
				}
				router.toPage('/pages/book/bookDetail/bookDetail', params, router.routerType.NAVIGATE_TO)
			}
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

	// 无数据状态
	.no-data {
		display: flex;
		flex: 1;
		width: 100vw;
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

	// Dialog
	.content-container {
		width: 630upx;
		min-height: 640upx;
		background: $uni-color-white;
		border-radius: 20upx;

		.title {
			font-size: 32upx;
			font-weight: 600;
			color: $uni-color-black;
			margin: 40upx 0;
		}

		.content {
			flex: 1;
			width: 630upx;

			.input {
				width: 470upx;
				height: 70upx;
				margin-top: 30upx;
			}
		}
	}
</style>
