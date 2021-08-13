<template>
	<view class="body">
		<!-- 展示多个职位 -->
		<u-navbar :is-back="false" back-icon-color='#ffffff' title="职位" :background="background" title-color='#ffffff'>
		</u-navbar>
		<view class="content">
			<!-- 添加职位 -->
			<view class="addPosition">
				<view class="addbtn">
					<u-button class='btn' :hover-stay-time='300' :custom-style="customStyle" shape="circle"
						:plain="true" :ripple="true" hair-line:false ripple-bg-color="#909399" type="primary"
						:hover-start-time='100' @click='toEditPosition(undefined)'>
						<u-icon name="plus" color="#69B3FF" size="64"></u-icon>
					</u-button>
				</view>
				<view class="release">
					发布职位
				</view>
			</view>
			<view :class="{positionBoxs:item.positionStatus==0,positionBox:item.positionStatus==1}" v-for="(item,index) in position" :key='index' @click="toEditPosition(item.id)">
				<view class="box1">
					<view class="box-banner">
						<!-- Android应届（实习生）LQ -->
						{{item.positionName}}
					</view>
				</view>
				<view class="box2">
					<view class="box2-left">
						职位要求:
					</view>
					<view class="box2r-right">
						<!-- 5天/周 3个月 -->
						{{item.positionRequire}}
					</view>
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
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
				},
				customStyle: {
					marginTop: '10rpx',
					marginBottom: '10rpx',
					width: '20%',
					height: '150rpx',
					borderRadius: '50%',

				},
				position: []
			}
		},
		onShow() {
			this.verification();
			
		},
		methods: {
			verification(){
				if(this.$store.state.result.enterpriseName==undefined){
					uni.redirectTo({
						url:"../login/login"
					})
				}else{
					this.getInfor();
				}
			},
			// 去编辑职位页面
			toEditPosition(positionId) {
				if (positionId == undefined) {
					uni.navigateTo({
						url: '/pages/editPosition/editPosition'
					})
				} else {
					uni.navigateTo({
						url: '/pages/editPosition/editPosition?positionId=' + positionId
					})
				}
			},
			getInfor() {
				uni.request({
					url: 'http://wuwu.free.idcfengye.com/position/getAllPositions?enterpriseId=' + store.state
						.result.id,
					method: 'GET',
					success: (res) => {
						this.position = res.data.data;
					}
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

	.addPosition {
		width: 100%;
		height: 240rpx;
		padding-top: 30rpx;
		background-color: #74d69b;
		border-radius: 0 0 34rpx 34rpx;

	}

	/* .addbtn{
		width: 12%;
		margin: 4% auto;
		
	} */
	.btn {
		/* border-radius: 50%; */
	}

	.positionBox {
		margin-top: 20rpx;
		height: 150rpx;
		
		background-color: #FFFFFF;
		

	}
	.positionBoxs {
		margin-top: 20rpx;
		height: 150rpx;
		color:#aeb2b9 ;
		background-color: #FFFFFF;
	}

	.release {
		font-size: 12rpx;
		font-weight: 400;
		color: #ffffff;
		text-align: center;
	}

	.box1 {
		width: 90%;
		height: 60rpx;
		margin: 0 auto;
		padding-top: 1rpx;

	}

	.box-banner {
		margin-top: 18rpx;
		font-weight: 550;
		font-size: 32rpx;
	}

	.box2 {
		width: 90%;
		margin: 0 auto;
		margin-top: 30rpx;
		font-weight: 400;
		font-size: 30rpx;
	}

	.box2-left {
		float: left;
	}

	.box2r-right {
		float: left;
	}
</style>
