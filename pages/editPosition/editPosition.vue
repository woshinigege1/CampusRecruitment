<template>
	<!-- by:ZhangXiaodong -->
	<view>
		<u-navbar :is-back="true" back-icon-color='#ffffff' title="编辑职位" :background="background" title-color='#ffffff'>
		</u-navbar>
		<form class="editPosition" method="post">
			<p>职位名称: </p>
			<view class="uni-form-item uni-column editPosition-item">
				<u-input type="text" class="uni-input" v-model="position.positionName"   />
			</view>
			<p>职位要求:</p>
			<view class="uni-form-item uni-column editPosition-item">
				<u-input type="text" class="uni-input" required="required" v-model="position.positionRequire" />
			</view>
			<p>职位描述: </p>
			<view class="uni-form-item uni-column editPosition-item">
				<u-input type="text" class="uni-input" v-model="position.positionDetail" />
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
					positionDetail:'',
					positionName:'',
					positionRequire:''
				}

			}
		},
		onLoad(option) {
			console.log(option);
			// console.log(option.positionId);
			if(option.positionId==undefined){
				console.log("没有PositionId")
				let position={
					positionDetail: "",
					positionName: "",
					positionRequire: ""
				}
				this.position=position;
			}else{
				console.log("有PositionId")
				this.id=option.positionId;
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
						console.log(res.data.data);
						that.position = res.data.data;
					}
				})
			},
			submit(positionStatus) {
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
						console.log(res);
						uni.switchTab({
							url:"../position/position"
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

	.editPosition-item {
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid #63B2FF;
		height: 70rpx;
		border-radius: 20rpx;
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
