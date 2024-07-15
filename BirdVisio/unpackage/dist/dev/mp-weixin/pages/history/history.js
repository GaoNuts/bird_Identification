"use strict";
const stores_birdsList = require("../../stores/birdsList.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      count: 0,
      pic: [],
      birdsName: [],
      birdsList2: ""
    };
  },
  created() {
    this.birdsList2 = stores_birdsList.birdsListStore();
  },
  onShow() {
    this.data1();
    console.log(222, this.birdsList2.$state);
  },
  methods: {
    data1() {
      let pic = this.birdsList2.$state.birdsList;
      let sort = this.birdsList2.$state.sort;
      this.pic = pic;
      this.birdsName = sort;
    },
    deletePic(e) {
      this.birdsList2.deleteBirds(e);
      this.data1();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.pic, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.t($data.birdsName[index]),
        c: common_vendor.o(($event) => $options.deletePic(index), item),
        d: item
      };
    }),
    b: common_vendor.t(_ctx.xxx)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b2d018fa"], ["__file", "D:/pythontrain/wangye/uniapp/bird_Identification/BirdVisio/pages/history/history.vue"]]);
wx.createPage(MiniProgramPage);
