<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');

			setTimeout(() => {
				// uni.setTabBarBadge({
				// 	index: 1,
				// 	text: '31'
				// });
				uni.showTabBarRedDot({
					index: 2
				});
			}, 1000);
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	@import 'ui/main.scss';
</style>
