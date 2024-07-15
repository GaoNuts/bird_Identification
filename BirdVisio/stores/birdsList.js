import {
	defineStore
} from 'pinia'
export const birdsListStore = defineStore('birdData', {
	state: () => {
		return {
			birdsList: [],
			sort: [],
			count: 0
		}
	},
	actions: {
		addBirds(bird) {
			this.birdsList.unshift(bird)   //存储的图像
			this.count++       //搜索数量
		},
		addSort(birdSort) {
			this.sort.unshift(birdSort)
		},
		deleteBirds(index) {
			this.birdsList.splice(index, 1)
			this.count--
			this.sort.splice(index, 1)
		}
	}
})