<template>
	<!-- by 姜维国 1803180130 -->
	<view class="body">
		<view class="body">
			<view class="Top">
			</view>
		</view>
		<u-navbar :is-back="false" back-icon-color='#ffffff' title="人才" :background="background" title-color='#ffffff'>
		</u-navbar>
		<view class="positionBox">
			<view class="positionBanner clearfix " :class="{positionBanners:item.personnelStatus==-1}"  @click="goto(item.id)" v-for="(item,indexs) in personInfo"
				:key='indexs'>
				<view class="" v-if='item.personnelStatus==0'>
					<!-- 空 -->
				</view>
				<view class="righticon" v-else-if="item.personnelStatus==1">
					<text class="checkmark">已邀请</text>
				</view>
				<view class="righticon" v-else-if="item.personnelStatus==-1">
					<text class="checkmarks">被淘汰</text>
				</view>
				<view class="Banner1">
					<view class="name">
						<text>
							{{item.personnelName}}
						</text>
					</view>
				</view>
				<view class="Banner2">
					<view class="sex">
						<text>
							{{item.personnelGender}}
						</text>|
					</view>
					<view class="age">
						<text>
							{{item.personnelAge}}
						</text>|
					</view>
					<view class="college">
						{{item.personnelUniversity}}
					</view>
				</view>
				<view class="position">
					<view class="position1">
						<text>
							期望职位：
						</text>
					</view>
					
					<view class="position2">
						{{item.positionName}}
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
				personInfo:[]
			}
		},
		onShow() {
			this.verification();
		}
		,
		methods: {
			verification(){
				//验证是否登录
				if(this.$store.state.result.enterpriseName==undefined){
					uni.redirectTo({
						url:"../login/login"
					})
				}else{
					this.getAllpersonnel();
				}
			},
			goto(id) {
				uni.navigateTo({
					url: '/pages/personnelDetail/personnelDetail?id='+id
				})
			},
			getAllpersonnel(){
				uni.request({
					url:'http://wuwu.free.idcfengye.com/personnel/getAllpersonnel',
					method:'GET',
					data:{
						enterpriseId:store.state.result.id
					},
					success: (res) => {
						this.personInfo=res.data.data;
					}
				})
			}
			
		}

	}
</script>
<style lang="scss" scoped>
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	.clearfix:after {
		content: '';
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.clearfix{
		*zoom :1;
	}
	page {
		background: #F9F9F9;
	}

	.wrap {
		padding: 24rpx;
	}

	.uform {
		margin: 0 auto;
		width: 80%;
		padding-bottom: 20rpx;

	}

	.intForm {
		margin-top: 20rpx;
	}

	.btn {

		margin-bottom: 20rpx;
	}

	.positionBox {
		width: 95%;
		margin: 0 auto;
	}

	.positionBanner {
		width: 100%;
		height: 200rpx;
		margin: 10rpx 0;
		background-color: #FFFFFF;
	}
	.positionBanners{
		color: #aeb2b9 ;
	}
	.Banner1{
		width: 100%;
		margin-left: 10rpx;
		padding-top: 20rpx;
	}
	.name {
		font-size: 40rpx;
		font-weight: 600;
	}
	.banner2 {
		width: 100%;
		margin-left: 10rpx;
		padding-top:20rpx ;
		font-size: 24rpx;
	}
	.sex {
		float: left;
		margin-left: 10rpx;
	}
	.age {
		float: left;
	}
	.college {
		float: left;
	}
	.position {
		
		width: 100%;
		margin-left: 10rpx;
		margin-top: 50rpx;
		margin-bottom: 15rpx;
	}
	.position1{
		float:left
	}
	.position2{
		float:left;
		font-size: 28rpx;
	}
	.righticon{
		float: right;
		margin-top: 30rpx;
		margin-right: 40rpx;
	}
	.checkmark{
		color:#A7E1C3  ;
		border: 1px solid #A7E1C3  ;
		
	}
	.checkmarks{
		color:#aeb2b9  ;
		border: 1px solid #aeb2b9 ;
	}
</style>

</style>
