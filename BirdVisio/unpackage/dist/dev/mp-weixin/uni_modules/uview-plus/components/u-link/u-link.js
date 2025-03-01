"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uLink_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const _sfc_main = {
  name: "u-link",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uLink_props.props],
  computed: {
    linkStyle() {
      const style = {
        color: this.color,
        fontSize: common_vendor.index.$u.addUnit(this.fontSize),
        // line-height设置为比字体大小多2px
        lineHeight: common_vendor.index.$u.addUnit(common_vendor.index.$u.getPx(this.fontSize) + 2),
        textDecoration: this.underLine ? "underline" : "none"
      };
      return style;
    }
  },
  methods: {
    openLink() {
      common_vendor.index.setClipboardData({
        data: this.href,
        success: () => {
          common_vendor.index.hideToast();
          this.$nextTick(() => {
            common_vendor.index.$u.toast(this.mpTips);
          });
        }
      });
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.text),
    b: common_vendor.o((...args) => $options.openLink && $options.openLink(...args)),
    c: common_vendor.s($options.linkStyle),
    d: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-12f6646d"], ["__file", "D:/pythontrain/wangye/uniapp/bird_Identification/BirdVisio/uni_modules/uview-plus/components/u-link/u-link.vue"]]);
wx.createComponent(Component);
