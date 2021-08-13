<template>
	<!-- by 黄陈森 1803180131  -->
	<view class="body">
		<view class="">
			<u-navbar :is-back="true" back-icon-color='#ffffff' title="人才详细信息" :background="background"
				title-color='#ffffff'></u-navbar>
			<scroll-view scroll-y="true" v-if="form!={}">
				<view class="detailInfor">
					<!-- <u-line color="grey" border-style="dashed"></u-line> -->
					<view class="biaoti">
						姓名：
					</view>
					<view class="neirong">
						{{form.personnelName}}
					</view>
					<u-line color="grey" border-style="dashed"></u-line>
					<view class="biaoti">
						个人情况：
					</view>
					<view class="neirong">
						{{form.personnelGender}}|{{form.personnelAge}}|{{form.personnelUniversity}}
					</view>
					<u-line color="grey" border-style="dashed"></u-line>
					<view class="biaoti">
						联系电话：
					</view>
					<view class="neirong">
						{{form.personnelTelephone}}
					</view>
					<u-line color="grey" border-style="dashed"></u-line>
					<view class="biaoti">
						期望职位：
					</view>
					<view class="neirong">
						<u-tag :text="form.positionName" type="info" mode="light" size="mini" />
					</view>
					<u-line color="grey" border-style="dashed"></u-line>
					<view class="biaoti">
						个人描述：
					</view>
					<view class="miaoshu">
						<u-read-more show-height="430" :toggle="true" :shadow-style="shadowStyle">
							<rich-text :nodes="form.personnelInformation"></rich-text>
						</u-read-more>
					</view>
				</view>
				<view class="detailBottom">
					<u-button class="custom-style" size="medium" :plain="true" :ripple="true" ripple-bg-color="#909399"
						type="success" @click='success(-1)'>再看看</u-button>
					<u-button class="custom-style" size="medium" :plain="true" :ripple="true" ripple-bg-color="#909399"
						type="success" @click='success(1)'>面试邀请</u-button>
				</view>
			</scroll-view>

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
				content: '',
				shadowStyle: {
					backgroundImage: "none",
				},
				form: {},
				id: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getpersonnel_id();
		},
		methods: {
			// 发出面试邀请
			success(status) {
				uni.request({
					url: 'http://wuwu.free.idcfengye.com/personnel/updatePersonnelStatus',
					data: {
						personnelId: this.id,
						personnelStatus:status
					},
					method:'GET',
					success(res) {
						
						uni.switchTab({
							url:'../personnel/personnel'
						})
					}
				})
			},
			getpersonnel_id() {
				let that = this;
				uni.request({
					url: 'http://wuwu.free.idcfengye.com/personnel/getPersonnelById',
					method: 'GET',
					data: {
						personnelId: this.id
					},
					success: (res) => {
						that.form = res.data.data;
					}
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	@import "uview-ui/index.scss";

	.body {
		width: 100%;
		height: 1600rpx;
		background-color: #F1F1F1;
	}

	.detailInfor {
		width: 85%;
		font-size: 35rpx;
		margin-left: 15rpx;
		margin-top: 5rpx;
	}

	.biaoti {
		border-radius: 10rpx;
		width: 27%;
		height: 50rpx;
		font-weight: bold;
	}

	.neirong {
		height: 60rpx;
		margin-left: 70rpx;
		word-wrap: break-word;
		font-size: 30rpx;
		color: #787878;
	}

	.miaoshu {
		height: 500rpx;
		margin-left: 70rpx;
		font-size: 30rpx;
		color: #787878;
	}

	.detailBottom {
		display: flex;
		width: 100%;
		flex-direction: row;
		position: fixed;
		bottom: 100rpx;

	}

	.custom-style {
		font-size: 30rpx;
		font-weight: bold;
		border: 3rpx solid;
	}
</style>
