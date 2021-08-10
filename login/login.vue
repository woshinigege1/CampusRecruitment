<template>
	<!-- 登录页面 -->
	<view class="">
		<!-- 提示窗 -->
		<!-- <u-modal v-model="show" :content="content"></u-modal> -->
		
		<!-- 头部栏 -->
		<!-- <view class="headBanner">
			<view class="circular">
				<view class="circularCenter">
					企业入驻
				</view>
			</view>
		</view> -->
		<view class="head">
			<head-Banner></head-Banner>
		</view>

		<!-- 用户登录核心部分 -->
		<view class="centerBanner">
			<view class="centerBanner_input">
				<view class="inputBanner">
					<u-field v-model="username" label="用户名:" placeholder="请填写用户名" :trim="false"></u-field>
				</view>
				<view class="inputBanner">
					<u-field v-model="pwd" label="密码:" type="text" :password='true' placeholder="请输入密码" :trim="false">
					</u-field>
				</view>
			</view>
			<!-- 用户守则 -->
			<checkbox-group class="checkBox" @change="checkboxChange">
				<label>
					<checkbox value="cb" />我已阅读<u-link href="javaScript:void(0);">{{msg}}</u-link>
				</label>
			</checkbox-group>
			<button class="submit" @click="toInfoEdit()">登录</button>
		</view>
		<!-- 底部栏 -->
		<view class="lastBanner">
			<view class="lastBannerLeft" @click="toRePassword()">
				忘记密码
			</view>
			<view class="lastBannerRight" @click="toRegister()">
				注册账号
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				pwd: '',
				msg: '用户守则',
				checkBoxState: false,
				show: false,
				content: '请阅读并勾选用户守则'
			}
		},
		computed: {

		},
		methods: {
			//提示窗
			async open() {
				this.show = true;
			},
			toRePassword() {
				uni.navigateTo({ //前往找回密码页面
					url: '/pages/retrievePassword/retrievePassword'
				})
			},
			toRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			toInfoEdit() {
				if (this.checkBoxState == true) {
					if (true) {
						//账号密码正确，前往编辑企业信息
						uni.redirectTo({
							url: '/pages/enterprise_InformationEditing/enterprise_InformationEditing'
						})
					} else {
						//密码错误
						console.log('账号或者密码错误')
					}
				} else if (this.checkBoxState == false) {
					console.log('请阅读并勾选用户守则');
					// open();
				}
			},
			checkboxChange() {
				this.checkBoxState == false ? this.checkBoxState = true : this.checkBoxState = false;
				console.log(this.checkBoxState);
				console.log('改变选取状态');
			},

		}
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	.head >>> .headBanner {
		width: 100%;
		height: 370rpx;
		background-color: #74d69b;
		
	}

	.head >>>.circular {
		margin: 130rpx 0 0 310rpx;
		position: absolute;
		width: 140rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		border-radius: 70rpx;
	}

	 .head >>>.circularCenter {
		position: relative;
		top: 24rpx;
		left: 38rpx;
		width: 70rpx;
		height: 70rpx;
		font-size: 14px;
		font-weight: 700;
		color: #63B2FF;
	}



	// .loginIcon {
	// 	float: left;
	// 	margin: 300rpx 0rpx 0rpx 342rpx;
	// 	font-weight: 500;
	// 	font-size: 18px;
	// 	color: #FFFFFF;


	// }


	.centerBanner {
		padding-top: 80rpx;
	}

	.centerBanner_input {
		// border: 1px solid #000000;
		width: 80%;
		margin-left: 10%;
	}


	.inputBanner {
		margin-left: 0rpx;
		border-bottom: 1px solid #000000;
	}


	.lastBanner {
		margin-top: 30rpx;
		width: 100%;
		height: 70rpx;
	}

	.lastBannerLeft {
		float: left;
		margin-left: 20rpx;
		width: 160rpx;
		height: 40rpx;
		color: #63B2FF;
	}

	.lastBannerRight {
		float: right;
		width: 160rpx;
		height: 40rpx;
		color: #63B2FF;
	}

	.checkBox {
		width: 80%;
		margin: 40rpx 0 0 10%;
	}

	.submit {
		width: 80%;
		height: 70rpx;
		line-height: 70rpx;
		font-weight: 500;
		margin-top: 50rpx;
		background-color: #81C784;
		color: #FFFFFF;
		border-radius: 8rpx;
	}
</style>
