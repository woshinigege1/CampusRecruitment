<template>
	<!-- by 徐诚真 1803180138 -->
	<!-- 企业个人界面 -->
	<view>
		<view class="headBanner">
			<view class="settingBox">
				<u-icon class='setting' name="setting" color="#ffffff" size="48"></u-icon>
			</view>
			<view class="profile">
				<u-avatar class='photo' :src="src" mode="circle"></u-avatar>
				<view class="profileContent">
					<view class="contentTop">
						{{companyname}}
					</view>
					<view class="contentBottom">
						企业用户
					</view>
				</view>
			</view>
		</view>
		<view class="banner">
			<view class="bannerBox clearfix" @click="toInformation()">
				<view class="bannercontent">
					企业信息
				</view>
			</view>
			<view class="bannerBox clearfix">
				<view class="bannercontent">
					我的账户
				</view>
			</view>
			<u-modal v-model="show" :content="content" :show-cancel-button='true' confirm-color='red' @confirm='confirm()'  :mask-close-able="true"></u-modal>
			<view class="bannerBox clearfix" @click="open()">
				<view class="bannercontent" >
					退出登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				show: false,
				content: '确认退出吗？',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
				},
				src: '../../static/logo.png',
				companyname: '吃了没有限公司'
			}
		},
		onShow() {
			this.verification();
			
		},
		methods: {
			verification(){
				//验证是否登录
				if(this.$store.state.result.enterpriseName==undefined){
					uni.redirectTo({
						url:"../login/login"
					})
				}else{
					this.companyname = store.state.result.enterpriseName;
				}
			},
			open() {
				this.show = true;
			},
			toInformation() {
				uni.navigateTo({
					url: "../enterpriseInformation/enterpriseInformation"
				})
			},
			confirm(){
				//vux清除
				this.$store.commit('toClear');
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	page {
		background: #F9F9F9;
	}

	.clearfix:after {
		content: '';
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.clearfix {
		*zoom: 1;
	}

	.headBanner {
		width: 100%;
		height: 300rpx;
		background-image: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63));
		border-radius: 0 0 34rpx 34rpx;
	}

	.settingBox {
		padding-top: 35rpx;
		width: 90%;
		margin: 0 auto;
	}

	.setting {
		float: right;
	}

	.profile {
		width: 90%;
		height: 100rpx;
		padding-top: 75rpx;
		height: 100rpx;
		margin: 0 auto;
	}

	.photo {
		float: left;
	}

	.profileContent {
		float: right;
		margin-right: 41%;

	}

	.contentTop {
		font-size: 40rpx;
		font-weight: 550;
		color: #FFFFFF;
	}

	.contentBottom {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.banner {
		width: 95%;
		margin: 0 auto;
	}

	.bannerBox {
		height: 89rpx;
		margin-bottom: 16rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}

	.bannercontent {
		float: left;
		margin-left: 10rpx;
		line-height: 89rpx;
	}
</style>
