<template>
	<view class="bistorymain">
		<scroll-view class="navscroll" enable-flex show-scrollbar="false">
			<view class="historyPic" v-for="(item, index) in pic" :key=item>
				<image :src="item" class="birdpic"></image>
				<view class="birdtext">
					<text>名称：{{birdsName[index]}}</text>
					<text>简介：{{xxx}}</text>
				</view>
				<view class="deletePic" @click="deletePic(index)">X</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { birdsListStore } from '@/stores/birdsList.js'
	
	
	export default {
		data() {
			return {
				count: 0,
				pic: [],
				birdsName: [],
				birdsList2: ''
			};
		},
		created(){
			this.birdsList2 = birdsListStore()
		},
		onShow(){		
			this.data1()
			console.log(222, this.birdsList2.$state)		
		},	
		methods: {		
			data1() {
				let pic = this.birdsList2.$state.birdsList     //存储的图像
				let sort = this.birdsList2.$state.sort    //存储的数量
				this.pic = pic
				this.birdsName = sort
				
			},
			deletePic(e) {					
				this.birdsList2.deleteBirds(e)
				this.data1()
			}
		}
		
	}
</script>

<style lang="scss" scoped>

	.bistorymain {
		.navscroll {
			display: flex;
			flex-direction: column;
			align-items: center;
			.historyPic {
				width: 95%;
				height: 6rem;
				margin-top: 0.2rem;
				background-color: #E7EEF8;
				display: flex;
				justify-content: space-between;
				.birdpic{
					width: 5.5rem;
					height: 5.5rem;
					margin-top: 0.25rem;
					margin-left: 0.25rem;
					background-color: #fff;
				}
				
				.birdtext {
					margin-top: 0.25rem;
					margin-left: 0.25rem;
					display: flex;
					flex-direction: column;
					font-size: 0.8rem;
					
					text {
						width: 12rem;
						text-overflow: ellipsis;
						white-space: nowrap; 
						overflow: hidden;
					}
				}
			
				.deletePic {
					float: right;
				}
			}
		}

	}

</style>
