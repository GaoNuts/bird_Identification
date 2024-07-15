<template>
	<view class="homemain">
		<view class="homeheader">
			 <u-notice-bar :text="text1" icon="BV"></u-notice-bar>
		</view>
		<view class="homebody">
			<view class="message">
				<view class="accpass">
					<text>账号：</text>
					<input type="text" style="background-color: #fff;" v-model="username">
				</view>
				<view class="accpass">
					<text>密码：</text>
					<input type="text" style="background-color: #fff;" v-model="password">
				</view>
			</view>
			<view class="submit">
				<button size="mini" @click="postselfdata">登录</button>
				<text @click="register">立即注册</text>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				text1: 'BirdVisio1.0正式发布！！！ 鸟类识别神器，识别精度高达90%',
				username:'',
				password:''
			}
		},
		onShow() {
			let overtimers = uni.getStorageSync("overtimers")	
			console.log('overtimers',overtimers)
			if (overtimers !== undefined) {
				let nowTimer = +new Date()
				if (parseInt(overtimers) - nowTimer >= 0) {
					uni.switchTab({
						url:'../../pages/index/index'
					})
				}
			} 
		},
		methods: {
			postselfdata() {
				// console.log(this.username, this.password)
				uni.request({
					url:'https://127.0.0.1:80/adminapi/user/login',
					data:{username:this.username,password: this.password},
					method:'POST',
					success:(res) => {
						console.log("overtimers",res.header.Overtimes)
						let timer = res.header.Overtimes
						if (res.statusCode === 200) {
							uni.setStorage({
								key: 'tokens',
								data: res.header.Authorization,
							});
							uni.setStorage({
								key: 'overtimers',
								data: timer
							});
							uni.switchTab({
								url:'../../pages/index/index'
							})
						}
						
					}
				})
			},
			register() {
				uni.request({
					url:'https://127.0.0.1:80/adminapi/user/add',
					data:{username:this.username,password: this.password},
					method:'POST',
					success:(res) => {
						console.log("res", res)
						if (res.status === 200) {
							uni.switchTab({
								url:'../../pages/index/index'
							})
						}	
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.homemain {
		width: 100%;
		height: 25rem;
		display: flex;
		flex-direction: column;
		.homeheader {
			width: 100%;
			height: 3rem;
		}
		.homebody {
			width: 100%;
			height: 100%;
			background-image: linear-gradient(#FED480, rgba(255, 0, 0, 0));
			// background-color: gray;
			.message {
				width: 80%;
				margin-left: 10%;
				height: 5rem;
				margin-top: 5rem;
				box-sizing: border-box;  //变为内边框
				border: 3px solid #ffaa7f;
				background-color: #FF7530;
				border-radius: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.accpass {
					display: flex;
					margin-top: 0.5rem;
					// background-color: pink;
				}
			}
			.submit{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 0.5rem;
			}
		}
	}
</style>
