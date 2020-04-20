<template>
	<view class="content">
		<view class="user-container">
			<view class="user-info-container">
				<open-data type="userNickName" class="user-info-nickname"></open-data>
			</view>
			<open-data type="userAvatarUrl" class="userinfo-avatar"></open-data>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
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
			vertical-align: center;
			justify-content: flex-end;
			height: 120upx;

			.user-info-nickname {
				font-size: 40upx;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 56u8px;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				overflow: hidden;
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
		}
	}
</style>
