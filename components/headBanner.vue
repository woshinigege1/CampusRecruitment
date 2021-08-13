<template>
	<view>
		<view class="headBanner">
			<view class="circular">
				<view class="circularCenter">
					{{msg}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"headBanner",
		data() {
			return {
				msg:'企业入驻'
			};
		}
	}
</script>

<style>
	.headBanner {
		width: 100%;
		height:265rpx;
		background-color: #74d69b;
	}
	
	.circular {
		margin: 24rpx 0 0 310rpx;
		position: absolute;
		width: 140rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		border-radius: 70rpx;
	}
	
	.circularCenter {
		position: relative;
		top: 30rpx;
		left: 42rpx;
		width: 70rpx;
		height: 70rpx;
		font-size: 14px;
		font-weight: 700;
		color: #63B2FF;
	
	}
</style>
