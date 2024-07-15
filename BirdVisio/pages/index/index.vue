<template>
	<view class="header">
		<view class="img1">
			<image src="../../static/image/bird2.png" aspectFit></image>
		</view>
		<view class="characters">
			<text style="font-size: 1rem;">1.0全新上线</text>
			<text style="font-size: 1rem;">欢迎您下载使用!!</text>
		</view>
	</view>
	<view class="body" v-show="state">
		<view class="bodytext">
			<text style="font-size: 1rem;">BirdVisio</text>
			<text style="font-size: 0.8rem;">500多种鸟类精确识别!!</text>
			<br>
			<br>
			<view style="font-size: 0.8rem;">点击图标进入选图模式</view>
		</view>
		<view class="img">
			<image src="../../static/image/ai.png" aspectFit @click="changeState"></image>
		</view>
	</view>
	<view v-show="!state" class="statePicPreMain">
		<view class="statePicPre">
			<view class="statePicPreSon">
				<uni-file-picker 
				ref="files" 
				file-mediatype="image"
				:auto-upload="false" 
				:limit="1" 	
				/>
			</view>
			<view class="btn">
				<button @click="upload" style="font-size: 0.8rem; " class="btnSon" type="default"
					plain="true">上传</button>
				<button @click="changeState" style="font-size: 0.8rem;" class="btnSon" type="default"
					plain="true">返回</button>
			</view>
		</view>
	</view>
	<view class="detial" v-show="!state">
		<view v-if="zhonglei">名称：{{zhonglei}}</view>

		<view v-else-if="load">暂无数据</view>
		<view v-else="!load">
			<u-loadmore :status="status" loadingText="正在识别中,请等待..."/>
		</view>	
	</view>
	
</template>

<script>
	import {
		birdsListStore
	} from '@/stores/birdsList.js'
	import axios from 'axios'

	export default {
		data() {
			return {
				status: 'loading',
				state: true,
				picPath: null,    //当前选中的图片
				zhonglei: '',     //服务端返回的鸟类类别
				birdsList1: '',   //为了获取pinia的变量
				load: true
			}
		},

		created() {
			this.birdsList1 = birdsListStore()
		},
		methods: {
			upload() {
				if (!this.$refs.files.files[0]) return false //没有图像，不进行上传，因为是单选，所以是第0位
				this.load = false
				this.picPath = this.$refs.files.files[0].path
				this.birdsList1.addBirds(this.picPath) //将图像存储到pinia中				
				// this.ovetTime()
				this.uploadpic()

			},
			ovetTime() {
				this.uploadpic()
			},
			
			onShow() {
			},
			changeState() {
				this.state = !this.state
				this.zhonglei = ''
				this.picPath = null  
			},

			uploadpic() {
				let tokens = uni.getStorageSync("tokens") || []
				const tempFilePaths = this.$refs.files.files[0].path;	
				this.zhonglei = ''  //上传前，将种类清空，能够保证加载栏显示
				const uploadFile = uni.uploadFile({
					url: 'https://127.0.0.1:80/postdata',
					filePath: tempFilePaths,
					header: {
					    'authorization': tokens //自定义请求头信息
					},
					name: 'avatar',
					formData: {
						'user': tempFilePaths,
					},
					success: (uploadFileRes) => {
						console.log(JSON.parse(uploadFileRes.data));
						let dataBird = JSON.parse(uploadFileRes.data)
						this.zhonglei = dataBird.data
						//将获取到的鸟的种类存入到pinia状态管理中
						this.birdsList1.addSort(dataBird.data)
						
						this.load = true
						// console.log(this.birdsList1.addSort(dataBird.data))
					}
				});
				
			}

		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		width: 100%;
		height: 10rem;
		background-image: linear-gradient(#FFC03D, rgba(255, 0, 0, 0));

		.img1 {
			image {
				margin-top: 2rem;
				margin-left: 1rem;
				height: 6rem;
				width: 5rem;
			}
		}

		.characters {
			display: flex;
			flex-direction: column;
			margin-top: 4rem;
			margin-left: 3rem;
		}
	}

	.body {
		height: 10rem;
		// border: 2px dotted skyblue;
		width: 100%;
		display: flex;

		.bodytext {
			width: 70%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 2rem;

		}

		image {
			margin-top: 4rem;
			margin-right: 2rem;
			width: 4rem;
			height: 4rem;
		}
	}

	.statePicPreMain {
		height: 10.5rem;
		background-color: #8B91AB;
		// background-image: linear-gradient(#FDB095, #210440);
		border-radius: 10%;
		overflow: hidden;

		.statePicPre {
			margin-top: 0.5rem;

			.statePicPreSon {
				width: 100%;
				margin-left: 35%;
			}

			.btn {
				display: flex;
				margin-top: 0.2rem;
				border-radius: 20%;

				.btnSon {
					border-radius: 50%;
				}
			}
		}
	}

	.detial {
		width: 100%;
		height: 6rem;
		margin-top: 1rem;
		background-color: #E7EEF8;
	}
</style>