"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text1: "BirdVisio1.0正式发布！！！ 鸟类识别神器，识别精度高达90%",
      username: "",
      password: ""
    };
  },
  onShow() {
    let overtimers = common_vendor.index.getStorageSync("overtimers");
    console.log("overtimers", overtimers);
    if (overtimers !== void 0) {
      let nowTimer = +/* @__PURE__ */ new Date();
      if (parseInt(overtimers) - nowTimer >= 0) {
        common_vendor.index.switchTab({
          url: "../../pages/index/index"
        });
      }
    }
  },
  methods: {
    postselfdata() {
      common_vendor.index.request({
        url: "https://127.0.0.1:80/adminapi/user/login",
        data: { username: this.username, password: this.password },
        method: "POST",
        success: (res) => {
          console.log("overtimers", res.header.Overtimes);
          let timer = res.header.Overtimes;
          if (res.statusCode === 200) {
            common_vendor.index.setStorage({
              key: "tokens",
              data: res.header.Authorization
            });
            common_vendor.index.setStorage({
              key: "overtimers",
              data: timer
            });
            common_vendor.index.switchTab({
              url: "../../pages/index/index"
            });
          }
        }
      });
    },
    register() {
      common_vendor.index.request({
        url: "https://127.0.0.1:80/adminapi/user/add",
        data: { username: this.username, password: this.password },
        method: "POST",
        success: (res) => {
          console.log("res", res);
          if (res.status === 200) {
            common_vendor.index.switchTab({
              url: "../../pages/index/index"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  _easycom_u_notice_bar2();
}
const _easycom_u_notice_bar = () => "../../uni_modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
if (!Math) {
  _easycom_u_notice_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.text1,
      icon: "BV"
    }),
    b: $data.username,
    c: common_vendor.o(($event) => $data.username = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.o((...args) => $options.postselfdata && $options.postselfdata(...args)),
    g: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/pythontrain/wangye/uniapp/bird_Identification/BirdVisio/pages/homepage/homepage.vue"]]);
wx.createPage(MiniProgramPage);
