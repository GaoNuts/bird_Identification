"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_birdsList = require("../../stores/birdsList.js");
const _sfc_main = {
  data() {
    return {
      name: "",
      show: false,
      //账号
      account: "",
      password: "",
      //搜索数量
      searchNumsStore: "",
      searchNums: 0,
      //收藏数量
      storeNums: 0
    };
  },
  created() {
    this.searchNumsStore = stores_birdsList.birdsListStore();
  },
  onShow() {
    this.searchNumsFn();
  },
  methods: {
    searchNumsFn() {
      this.searchNums = this.searchNumsStore.$state.count;
      console.log(this.searchNums);
    },
    //跳转到历史页
    gohistory() {
      common_vendor.index.switchTab({
        url: "/pages/history/history"
      });
    },
    //个人信息填写窗口
    changeName() {
      this.name = this.account;
      this.close();
    },
    open() {
    },
    close() {
      this.show = false;
    }
  }
};
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_avatar2 + _easycom_u_popup2)();
}
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.show = true),
    b: common_vendor.p({
      text: $data.name[0],
      fontSize: "18",
      randomBgColor: true
    }),
    c: common_vendor.t($data.name),
    d: $data.account,
    e: common_vendor.o(($event) => $data.account = $event.detail.value),
    f: $data.password,
    g: common_vendor.o(($event) => $data.password = $event.detail.value),
    h: common_vendor.o((...args) => $options.changeName && $options.changeName(...args)),
    i: common_vendor.o($options.close),
    j: common_vendor.o($options.open),
    k: common_vendor.p({
      show: $data.show,
      mode: "center"
    }),
    l: common_vendor.t($data.searchNums),
    m: common_vendor.o((...args) => $options.gohistory && $options.gohistory(...args)),
    n: common_vendor.t($data.storeNums)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/pythontrain/wangye/uniapp/bird_Identification/BirdVisio/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
