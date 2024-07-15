"use strict";
const common_vendor = require("../common/vendor.js");
const birdsListStore = common_vendor.defineStore("birdData", {
  state: () => {
    return {
      birdsList: [],
      sort: [],
      count: 0
    };
  },
  actions: {
    addBirds(bird) {
      this.birdsList.unshift(bird);
      this.count++;
    },
    addSort(birdSort) {
      this.sort.unshift(birdSort);
    },
    deleteBirds(index) {
      this.birdsList.splice(index, 1);
      this.count--;
      this.sort.splice(index, 1);
    }
  }
});
exports.birdsListStore = birdsListStore;
