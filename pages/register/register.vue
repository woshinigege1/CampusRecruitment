<template>
	<view>
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="注册" :background="background" title-color='#ffffff'>
		</u-navbar>
		<!-- 全局组件：头部栏 -->
		<head-Banner></head-Banner>
		<!-- 表单 -->
		<view class="uform">
			<u-form label-width='160rpx' class='intForm' :model="form" ref="uForm">
				<u-form-item label="用户名" prop='username'>
					<u-input v-model="form.username" placeholder='请输入用户名' />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input :type="passType" v-model="form.password" placeholder='请输入密码' />
				</u-form-item>
				<u-form-item label="确认密码" prop="comparePwd">
					<u-input :type="passType" v-model="form.comparePwd" placeholder='请确认密码' />
				</u-form-item>
				<u-form-item label="邮箱" prop="email">
					<u-input v-model="form.email" placeholder='请输入邮箱' />
				</u-form-item>
				<u-form-item label="验证码" prop="ucode">
					<u-input v-model="form.ucode" placeholder='请输入6位验证码' />
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"
							@change="codeChange">
						</u-verification-code>
						<u-button @tap="getCode">{{tips}}</u-button>
					</view>
				</u-form-item>
				<u-button class='btn' :plain="true" :ripple="true" ripple-bg-color="#909399" type="success">提交
				</u-button>
			</u-form>

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
				form: {
					username: '',
					password: '',
					comparePwd: '',
					email: '',
					ucode: ''
				},
				passType: 'password',
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur,change'
					}, {
						min: 2,
						max: 10,
						message: '请输入2~10字符长度的用户名',
						trigger: 'blur,change'
					}],
					password: [{
							required: true,
							message: '未输入密码',
							trigger: 'blur,change'
						},
						{
							min: 6,
							max: 18,
							message: '请输入6~18位的密码',
							trigger: 'blur,change'
						}, {
							validator: (rule, password, callback) => {
								return this.$u.test.enOrNum(password);
							},
							message: "不能带特殊字符",
							trigger: 'blur,change'
						}
					],
					comparePwd: [{
							required: true,
							message: '未输入密码',
							trigger: 'blur,change'
						}, {
							min: 6,
							max: 18,
							message: '请输入6~18位的密码',
							trigger: 'blur,change'
						}, {
							required: true,
							asyncValidator: (rule,value, callback) => {
								if (value != this.form.password) {
									callback(new Error('两次密码不一致'))
								} else {
									callBack()
								}
							},
							trigger: 'blur,change'
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.enOrNum(value);
							},
							message: "不能带特殊字符",
							trigger: 'change'
						}
					],
					email: [{
						required: true,
						message: '未输入邮箱',
						trigger: 'blur,change'
					}, {
						type: 'email',
						message: '请输入正确邮箱',
						trigger: 'blur,change'
					}],
					ucode: [{
						required: true,
						message: "未输入验证码",
						trigger: 'blur,change'
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.code(value, 6);
						},
						message: "请输入正确验证码",
						trigger: 'blur,change'
					}]
				},
				tips: '',
				// refCode: null,
				seconds: 60, //验证码获取倒计时
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() { //验证码
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

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
</style>
