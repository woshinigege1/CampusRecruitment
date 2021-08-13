<template>
	<!-- by:徐诚真 -->
	<!-- 登录页面 -->
	<view class="">
		<!-- 提示窗 -->
		<!-- <u-modal v-model="show" :content="content"></u-modal> -->
		<!-- 头部栏 -->
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
			<u-button class='btn submit' :plain="true" :ripple="true" @click="toLogin()" ripple-bg-color="#909399"
				type="success">登录
			</u-button>
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
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				username: '',
				pwd: '',
				msg: '用户守则',
				checkBoxState: false,
				show: false,
				rules: {
					username: {

					}
				}
			}
		},
		onReady() {},
		computed: {

		},

		methods: {
			//提示窗
			async open() {
				this.show = true;
			},
			routeJudge(data) {
				if (store.state.loginStatus == 200) {
					//账号密码正确，
					this.$store.commit("updateEnterpriseInformation", data);
					if (data.enterpriseName == null) {
						//如果企业信息为空
						uni.redirectTo({
							url: '/pages/enterprise_InformationEditing/enterprise_InformationEditing'
						})
					} else {
						//跳转到主页
						uni.switchTab({
							url: '../position/position'
						})
					}

				} else if (store.state.loginStatus == 400) {
					//密码错误
					this.$u.toast('账号或者密码错误')
				}
			},
			toRePassword() {
				this.$u.toast('在写了，在写了...')
			},
			toRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			toLogin() {
				if (this.checkBoxState == true) { //勾选
					uni.showLoading({
						title: '正在登录...'
					});
					uni.request({ //获取用户信息
						url: 'http://wuwu.free.idcfengye.com/enterprise/login',
						method: 'POST',
						data: {
							nickname: this.username,
							password: this.pwd,
						},
						dataType: 'json',
						success: (res) => {
							store.state.loginStatus = res.data.code; //把状态码传到vuex
							setTimeout(function () {
							    uni.hideLoading();
							}, 200);
							this.routeJudge(res.data.data);
						},
					    fail() {
					    	setTimeout(function () {
					    	    uni.hideLoading();
					    	}, 200);
							this.$u.toast('登录失败');
					    }
					})
				} else if (this.checkBoxState == false) {
					this.$u.toast('请阅读并勾选用户守则')
				}
			},
			checkboxChange() {
				this.checkBoxState == false ? this.checkBoxState = true : this.checkBoxState = false;
			},

		}
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	.head /deep/ .headBanner {
		width: 100%;
		height: 370rpx;
		background-color: #74d69b;

	}

	.head /deep/.circular {
		margin: 130rpx 0 0 310rpx;
		position: absolute;
		width: 140rpx;
		height: 140rpx;
		background-color: #FFFFFF;
		border-radius: 70rpx;
	}

	.head /deep/.circularCenter {
		position: relative;
		top: 32rpx;
		left: 42rpx;
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
		border-bottom: 1px solid #F4F6F8;
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
