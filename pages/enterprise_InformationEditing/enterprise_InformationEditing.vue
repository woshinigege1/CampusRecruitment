<template>
	<!-- 企业信息编辑和修改 -->
	<!-- by LinBaichang 1803180164 -->
	<view>
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="企业信息编辑" :background="background"
			title-color='#ffffff'>
		</u-navbar>
		<view>
			<u-image width="100%" height="400rpx" :src="src"></u-image>
		</view>
		<view class="box">
			<view class="QYXX">企业信息</view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="名称:" prop="enterpriseName">
					<u-input v-model="form.enterpriseName" />
				</u-form-item>
				<u-form-item label="人数:" prop="enterpriseNum">
					<u-input v-model="form.enterpriseNum" />
				</u-form-item>
				<u-form-item label="类型:">
					<u-input v-model="form.type.label" type="select" @click="show= true" />
				</u-form-item>
				<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
				<u-form-item label="企业简介:" prop="synopsis">
					<u-input v-model="form.synopsis" :type="type" :border="border" :height="height"
						:auto-height="autoHeight" />
				</u-form-item>
			</u-form>
		</view>
		<view>
			<u-button class='btn success' :plain="true" :ripple="true" ripple-bg-color="#909399" type="success"
				@click="submit()">完成
			</u-button>
		</view>

	</view>


</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				type: 'textarea',
				border: true,
				height: 100,
				autoHeight: true,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
				},
				src: '/static/editPositionBackground.jpg',
				form: {
					enterpriseName: '',
					enterpriseNum: '',
					type: {
						value: '',
						label: ''
					},
					synopsis: ''
				},
				rules: {
					enterpriseName: [{
						required: true,
						message: '企业名未填写',
						trigger: ['blur', 'change']
					}],
					enterpriseNum: [{
							required: true,
							message: '企业人数未填写',
							trigger: ['blur']
						},
						{
							type: 'number',
							message: '企业人数必须为纯数字',
							trigger: ['blur', 'change']
						}
					],
					synopsis: [{
						required: true,
						message: '企业简介未填写',
						trigger: ['blur', 'change']
					}]
				},
				show: false,
				list: [{
						value: '1',
						label: '互联网类'
					},
					{
						value: '2',
						label: '服务类'
					},
					{
						value: '3',
						label: '咨询类'
					},
					{
						value: '4',
						label: '安装维修类'
					},
					{
						value: '5',
						label: '工程设计类'
					},
					{
						value: '6',
						label: '科技类'
					}
				],
			}
		},
		computed: {
			...mapState(['result'])
		},
		created() {
			// 回显企业信息
			console.log(this.result.id);
			this.loadInformation();

		},
		methods: {
			loadInformation() {
				this.form.enterpriseName = this.result.enterpriseName;
				this.form.enterpriseNum = this.result.enterpriseNum;
				this.form.synopsis = this.result.synopsis;
				this.form.type.label = this.result.enterpriseCategory;
			},
			// 多选框
			confirm(e) {
				console.log(e);
				this.form.type = e[0];
			},
			onReady() {
				this.$refs.uForm.setRules(this.rules);
			},
			toPrompt(e) {
				uni.showToast({
					title: e?'提交成功':'内容有误',
					duration: 2000
				})
			},
			// 提交
			submit() {
				var e = false;
				var validInfo = this.$refs.uForm.validate(valid => {
					e = valid
				})
				let that = this;
				if (this.form.enterpriseName == null) {
					this.toPrompt(false);
				} else if (this.form.enterpriseNum == null) {
					this.toPrompt(false);
				}
				// else if (typeof(this.form.enterpriseNum) != Number) {
				// 	this.$u.toast('企业人数只能为数字');	
				// } 
				else if (this.form.type.label == null) {
					this.toPrompt(false);
				} else if (this.form.synopsis == null) {
					this.toPrompt(false);
				} else if (e == false) {
					this.toPrompt(false);
				} else {
					var obj = {
						id: this.result.id,
						email: this.result.email,
						enterpriseName: this.form.enterpriseName,
						enterpriseNum: this.form.enterpriseNum,
						enterpriseCategory: this.form.type.label,
						synopsis: this.form.synopsis
					}
					this.toPrompt(true);
					uni.request({
						url: 'http://wuwu.free.idcfengye.com/enterprise/updateEnterpriseInformation',
						data: {
							id: this.result.id,
							email: this.result.email,
							enterpriseName: this.form.enterpriseName,
							enterpriseNum: this.form.enterpriseNum,
							enterpriseCategory: this.form.type.label,
							synopsis: this.form.synopsis
						},
						method: "POST",
						// dataType: 'json',
						success(res) {
							that.$store.commit("updateEnterpriseInformation", obj);
							uni.switchTab({
								url: "../my/my"

							})

						}
					})
				}



			}
		}
	}
</script>

<style>
	.success {
		width: 80%;
		height: 70rpx;
		line-height: 70rpx;
		font-weight: 500;
		margin-top: 130rpx;
		background-color: #81C784;
		color: #FFFFFF;
		border-radius: 8rpx;

	}

	.QYXX {
		border-radius: 10rpx;
		width: 30%;
		height: 50rpx;
		font-weight: bold;
	}

	.box {
		width: 80%;
		margin: 0 auto;
		padding-top: 50rpx;
	}
</style>
