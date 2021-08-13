<template>
	<!-- by:ZhangXiaodong -->
	<view class="body">
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="编辑职位" :background="background" title-color='#ffffff'>
		</u-navbar>
		<form class="editPosition" method="post">

			<view class="box">
				<view class="content">
					职位名称:
				</view>
				<view class="uni-form-item uni-column editPosition-item">
					<u-input type="text" class="uni-input" v-model="position.positionName" />
				</view>
			</view>
			<view class="box">
				<view class="content">
					职位要求:
				</view>
				<view class="uni-form-item uni-column editPosition-item">
					<u-input type="text" class="uni-input" required="required" v-model="position.positionRequire" />
				</view>
			</view>
			<view class="box">
				<view class="content">
					职位描述:
				</view>
				<view class="uni-form-item uni-column editPosition-item">
					<u-input type="text" class="uni-input" v-model="position.positionDetail" />
				</view>
			</view>
			<view class="ex"></view>
			<view class="uni-btn-v editPosition-submit">
				<u-button class='btn' :plain="true" :ripple="true" ripple-bg-color="#909399" type="success"
					@click="submit(0)">停止</u-button>
				<u-button class='btn' :plain="true" :ripple="true" ripple-bg-color="#909399" type="success"
					@click="submit(1)">发布</u-button>
			</view>

		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
				},
				// 职业id
				id: null,
				position: {
					positionDetail: '',
					positionName: '',
					positionRequire: ''
				}

			}
		},
		onLoad(option) {
			
			if (option.positionId == undefined) {
				
				let position = {
					positionDetail: "",
					positionName: "",
					positionRequire: ""
				}
				this.position = position;
			} else {
				
				this.id = option.positionId;
				this.getPositionById();
			}
		},
		methods: {
			getPositionById() {
				// 获取职位信息
				let that = this;
				uni.request({
					url: "http://wuwu.free.idcfengye.com/position/getPositionById?positionId=" + this.id,
					success(res) {
						
						that.position = res.data.data;
					}
				})
			},
			
			submit(positionStatus) {
				if (positionStatus == 1) {
					this.$u.toast('正在发布...')
				} else {
					this.$u.toast('停止发布中...')

				}
				//判断是否为空
				if (this.position.positionName.length == 0) {
					
					return uni.showToast({
						title: '请输入职位名称',
						icon: 'none',
						duration: 2000
					});
				} else if (this.position.positionRequire.length == 0) {
					
					return uni.showToast({
						title: '请输入职位要求',
						icon: 'none',
						duration: 2000
					});

				} else if (this.position.positionDetail.length == 0) {
					
					return uni.showToast({
						title: '请输入描述',
						icon: 'none',
						duration: 2000
					});

				}
				uni.request({
					url: "http://wuwu.free.idcfengye.com/position/updatePosition",
					data: {
						// 企业id
						"enterpriseId": this.$store.state.result.id,
						// 职位id
						"id": this.id,
						"positionDetail": this.position.positionDetail,
						"positionName": this.position.positionName,
						"positionRequire": this.position.positionRequire,
						"positionStatus": positionStatus
					},
					method: "POST",
					// dataType:'json'
					success(res) {
						
						uni.switchTab({
							url: "../position/position"
						})
					},


				})
			},


		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	.body {
		width: 100%;
		height: 1300rpx;
	}

	.editPosition {
		width: 90%;
		
	}

	.editPosition-item {
		margin-bottom: 20rpx;
		width: 90%;
		margin: 0 auto;
		// border-bottom: 1rpx solid #63B2FF;
		height: 70rpx;
		border-radius: 20rpx;
		// background-color: #000000;
	}
	.box {
		padding-top: 20rpx;
	}

	.content {
		float: left;
		height: 68rpx;
		line-height: 68rpx;
	}

	.uni-input {
		float: left;
	}

	.editPosition-submit {
		display: flex;
	}

	.ex {

		width: 300px;
		height: 200px;
	}

	.editPosition-submit button {
		width: 20%;
		background-color: #f1f1f1;
	}
</style>
