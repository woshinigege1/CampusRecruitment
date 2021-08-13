<template>
	<view>
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="企业信息" :background="background" title-color='#ffffff'>
		</u-navbar>
		<view class="">
			<view class="imageBg">
				<u-avatar :src="src" mode="circle" size="100" style="margin-left: 315rpx; margin-top: 140rpx;"></u-avatar>
				<view style="font-size: 40rpx; text-align: center;">{{informations.enterpriseName}}</view>
			</view>
			<view class="content">
				<view style="font-weight: 600;font-size: 30rpx;">企业人数:</view>
				<text style="font-size: 20rpx;">{{informations.enterpriseNum}}人</text>
				<view style="font-weight: 600;font-size: 30rpx;">企业类型:</view>
				<text style="font-size: 20rpx;">{{informations.enterpriseCategory}}</text>
				<view style="font-weight: 600;font-size: 30rpx;">企业简介:</view>
				<text style="font-size: 20rpx;">{{informations.synopsis}}</text>
			</view>
			<u-button :plain="true"  :ripple="true" ripple-bg-color="#909399" type="success"  shape='circle' style=" position: absolute;right: 30px;bottom: 40px;
							font-weight: 400; font-size: 30rpx;" @click="toEdit()">修改</u-button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
				},
				src: "https://img2.baidu.com/it/u=3864877946,608228203&fm=26&fmt=auto&gp=0.jpg",
				informations: {}

			}
		},
		created() {
			this.loadInformation();
		},
		methods: {
			toEdit() {
				uni.navigateTo({
					url: "../enterprise_InformationEditing/enterprise_InformationEditing"
				})
			},
			loadInformation() {
				this.informations = this.$store.state.result;
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	.imageBg{
		background-image: url(../../static/back.jpeg) ;
	}
	.content {
		width: 90%;
		margin: 40rpx auto;
	}
</style>
