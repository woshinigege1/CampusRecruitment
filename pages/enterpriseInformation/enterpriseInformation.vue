<template>
	<view>
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="企业信息" :background="background" title-color='#ffffff'>
		</u-navbar>
		<view class="">
			<u-avatar :src="src" mode="circle" size="200" style="margin-left: 140px; margin-top: 70px;"></u-avatar>
			<view style="font-size: 30px; text-align: center;">{{informations.enterpriseName}}</view>
			<view style="font-weight: 900;font-size: 20px;">企业人数:</view>
			<text style="font-size: 20px;">{{informations.enterpriseNum}}人</text>
			<view style="font-weight: 900;font-size: 20px;">企业类型:</view>
			<text style="font-size: 20px;">{{informations.enterpriseCategory}}</text>
			<view style="font-weight: 900;font-size: 20px;">企业简介:</view>
			<text style="font-size: 20px;">{{informations.synopsis}}</text>
			<u-button :ripple="true" ripple-bg-color="#909399" shape='circle' style=" position: absolute;right: 30px;bottom: 40px;
							background-color: #19BE6B;font-weight: 900; font-size: 17px;" @click="toEdit()">修改</u-button>

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
</style>
