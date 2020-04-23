<template>
	<view class="page-container">
		<view class="user-container">
			<view class="user-info-container">
				<open-data type="userNickName" class="user-info-nickname"></open-data>
			</view>
			<open-data type="userAvatarUrl" class="userinfo-avatar"></open-data>
		</view>

		<view class="menu-list-container">
			<view class="item_container" @tap="toAccountBook">
				<image class="icon" src="/static/img/me/icon_account_book.png"></image>
				<text class="title">我的账本</text>
				<image class="next" src="/static/img/common/icon_next_right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const router = require('../../../common/router.js');
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			toAccountBook: function() {
				router.toPage('/pages/book/bookManage/bookManage', null, router.routerType.NAVIGATE_TO)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		height: 100vh;
		background: $uni-bg-color-grey;
	}

	/* 用户信息 */
	.user-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		vertical-align: center;
		padding: 20upx 40upx;
		background: white;

		.user-info-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 120upx;

			.user-info-nickname {
				font-size: 40upx;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 56upx;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-align: left;
			}
		}

		.userinfo-avatar {
			overflow: hidden;
			display: block;
			width: 108upx;
			height: 108upx;
			border-radius: 50%;
			border: 6upx solid #fff;
			box-shadow: 6upx 6upx 20upx rgba(0, 0, 0, 0.2);
			margin-left: 20upx;
		}
	}

	// 菜单列表
	.menu-list-container {
		width: 100vw;
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: white;
		position: relative;
		margin-top: 20upx;

		.item_container {
			width: 100vw;
			height: 100upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			background: white;
			position: relative;

			.icon {
				height: 35upx;
				width: 35upx;
				margin: 40upx;
			}

			.title {
				flex: 1;
				font-size: 30upx;
				color: #333333
			}

			.next {
				height: 28upx;
				width: 16upx;
				margin-right: 40upx;
			}
		}
	}
</style>
