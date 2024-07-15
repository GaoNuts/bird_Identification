<template>
	<view class="userMain">
		<view class="userhead">
			<view class="icon_Name">
				<view class="icon">
					<u-avatar
						:text=name[0]
						fontSize="18"
						randomBgColor
						@click="show = true"
					></u-avatar>
				</view>
				<view class="userName">{{name}}</view>
			</view>
			
			<view>
				<u-popup :show="show" mode="center" @close="close" @open="open">
					<view style="width: 12rem; height: 5rem; margin-left: 0.5rem;">
				        <view style="display: flex;">
							<view>账</view>
							<view>号：</view>
							<input type="text" placeholder="请输入账号" v-model="account">
						</view>
						<hr>
						<view style="display:flex">
							<view>密</view>
							<view>码：</view>
							<input type="password" placeholder="请输入密码" v-model="password">
						</view>
						<hr>
						<view style="width: 100%; display: flex; justify-content: center;">
							<view style="margin-top: 0.3rem;">
								<button size="mini" @click="changeName">提交</button>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
			
			<view class="searchData">
				<view class="searchHistory" @click="gohistory">
					<view class="userSearchData">{{searchNums}}</view>
					<view class="userSearchData">搜索数量</view>
				</view>
				<view class="searchStore">
					<view class="userSearchData">{{storeNums}}</view>
					<view class="userSearchData">我的收藏</view>
				</view>
			</view>
			
		</view>
		<view class="userbody"></view>
	</view>
</template>

<script>
	import { birdsListStore } from '@/stores/birdsList.js'
	export default {
		data() {
			return {
				name:'',
				show: false,
				//账号
				account:'',
				password:'',
				//搜索数量
				searchNumsStore:'',
				searchNums:0,
				//收藏数量
				storeNums:0
			};
		},
		created(){
			this.searchNumsStore = birdsListStore()
		},
		onShow(){
			this.searchNumsFn()
		},
		methods:{
			searchNumsFn() {
				this.searchNums = this.searchNumsStore.$state.count
				console.log(this.searchNums)
			},
			//跳转到历史页
			gohistory() {
				uni.switchTab({
					url:'/pages/history/history'
				})
			},
			//个人信息填写窗口
			changeName() {
				this.name = this.account
				this.close()
			},
			open() {
			        // console.log('open');
			},
			close() {
			    this.show = false
			    // console.log('close');
			},
			
		}
	}
</script>

<style lang="scss">
	.userhead {
		width: 100%;
		height: 10rem;
		background-image: linear-gradient(#FFC03D, rgba(255, 0, 0, 0));
		overflow: hidden;
		position: relative;
		.icon_Name {
			position: absolute;
			margin-top: 2rem;
			margin-left: 2rem;
			display: flex;
			align-items: center;
			.userName {
				margin-left: 0.5rem;
			}
		}
		.searchData {
			position: absolute;
			width: 80%;
			margin-left: 10%;
			border-radius: 5px;
			height: 4rem;
			margin-top: 4.5rem;
			background-color: #cdd5f8;
			display: flex;
			align-items: center;
			.searchHistory {
				height: 3.5rem;
				width: 50%;
				border-right:0.1rem solid white;
				.userSearchData{
					text-align: center;
					height: 1.7rem;
				}
			}
			.searchStore {
				height: 3.5rem;
				width: 50%;
				.userSearchData{
					text-align: center;
					height: 1.7rem;
				}
			}
		}
	}
</style>
