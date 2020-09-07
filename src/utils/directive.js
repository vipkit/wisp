import Vue from "vue";

export default () => {
    // el-select下拉刷新
    Vue.directive("loadmore", {
        bind(el, binding) {
            const SELECTWRAP = el.querySelector(
                ".el-select-dropdown .el-select-dropdown__wrap"
            );
            SELECTWRAP.addEventListener("scroll", function () {
                const CONDITION =
                    this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (CONDITION) {
                    binding.value();
                }
            });
        },
    });
};