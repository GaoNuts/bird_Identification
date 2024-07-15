"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_birdsList = require("../../stores/birdsList.js");
const _sfc_main = {
  data() {
    return {
      status: "loading",
      state: true,
      picPath: null,
      //当前选中的图片
      zhonglei: "",
      //服务端返回的鸟类类别
      birdsList1: "",
      //为了获取pinia的变量
      load: true
    };
  },
  created() {
    this.birdsList1 = stores_birdsList.birdsListStore();
  },
  methods: {
    upload() {
      if (!this.$refs.files.files[0])
        return false;
      this.load = false;
      this.picPath = this.$refs.files.files[0].path;
      this.birdsList1.addBirds(this.picPath);
      this.uploadpic();
    },
    ovetTime() {
      this.uploadpic();
    },
    onShow() {
    },
    changeState() {
      this.state = !this.state;
      this.zhonglei = "";
      this.picPath = null;
    },
    uploadpic() {
      let tokens = common_vendor.index.getStorageSync("tokens") || [];
      const tempFilePaths = this.$refs.files.files[0].path;
      this.zhonglei = "";
      common_vendor.index.uploadFile({
        url: "https://127.0.0.1:80/postdata",
        filePath: tempFilePaths,
        header: {
          "authorization": tokens
          //自定义请求头信息
        },
        name: "avatar",
        formData: {
          "user": tempFilePaths
        },
        success: (uploadFileRes) => {
          console.log(JSON.parse(uploadFileRes.data));
          let dataBird = JSON.parse(uploadFileRes.data);
          this.zhonglei = dataBird.data;
          this.birdsList1.addSort(dataBird.data);
          this.load = true;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_uni_file_picker2 + _easycom_u_loadmore2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_u_loadmore = () => "../../uni_modules/uview-plus/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_u_loadmore)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.changeState && $options.changeState(...args)),
    b: $data.state,
    c: common_vendor.sr("files", "36400ea1-0"),
    d: common_vendor.p({
      ["file-mediatype"]: "image",
      ["auto-upload"]: false,
      limit: 1
    }),
    e: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    f: common_vendor.o((...args) => $options.changeState && $options.changeState(...args)),
    g: !$data.state,
    h: $data.zhonglei
  }, $data.zhonglei ? {
    i: common_vendor.t($data.zhonglei)
  } : $data.load ? {} : {
    l: common_vendor.p({
      status: $data.status,
      loadingText: "正在识别中,请等待..."
    })
  }, {
    j: $data.load,
    k: !$data.load,
    m: !$data.state
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/pythontrain/wangye/uniapp/bird_Identification/BirdVisio/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
