<template>
  <div>
    <el-form-item
      label="标题"
      prop="title"
      :rules="[
        {
          required: true,
          message: '不能为空',
        },
      ]"
    >
      <el-input v-model="form.title" class="w-64" placeholder="标题" />
    </el-form-item>
    <el-form-item
      label="图片"
      prop="imageUrl"
      :rules="[
        {
          required: true,
          message: '请上传图片',
        },
      ]"
    >
      <ImageUploader v-model="form.imageUrl" />
      <span class="text-sm text-gray-600">图片建议尺寸：200*220</span>
    </el-form-item>
    <el-form-item
      label="关联商家"
      prop="merchantId"
      :rules="[{ required: true, message: '请选择关联商家' }]"
    >
      <el-select v-model="form.merchantId" @change="changeMerchant">
        <el-option
          v-for="(merchant, index) of merchants"
          :key="index"
          :label="merchant.name"
          :value="merchant.id"
        />
      </el-select>
    </el-form-item>
    <div v-if="form.merchantId" class="flex">
      <el-form-item
        label="跳转页面"
        prop="targetType"
        :rules="[{ required: true, message: '请选择跳转页面' }]"
      >
        <el-select v-model="form.targetType" @change="changeTargetType">
          <el-option
            v-for="(key, value) of consts.ProviderLinkTargetEnum"
            :key="key"
            :label="key"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="[consts.GOODS].includes(form.targetType)"
        label-width="20px"
        prop="targetId"
        :rules="[{ required: true, message: '请选择跳转的商品详情' }]"
      >
        <LoadSelect
          v-if="goods"
          v-model="form.targetId"
          :data="goods"
          :page="goodsPage"
          :has-more="goodsMore"
          :request="getGoods"
          type="goods"
        />
      </el-form-item>
      <el-form-item
        v-if="[consts.COUPON].includes(form.targetType)"
        label-width="20px"
        prop="targetId"
        :rules="[{ required: true, message: '请选择跳转的优惠券' }]"
      >
        <LoadSelect
          v-if="coupons"
          v-model="form.targetId"
          :data="coupons"
          :page="couponPage"
          :has-more="couponMore"
          :request="getCoupon"
          type="coupon"
        />
      </el-form-item>
    </div>
    <el-form-item
      label="互动文案"
      prop="actionButtonText"
      :rules="[
        { required: true, message: '请输入互动文案' },
        { max: 20, message: '不能超过20字' },
      ]"
    >
      <el-input
        v-model="form.actionButtonText"
        placeholder="请输入互动文案"
        class="w-64"
      />
    </el-form-item>
    <el-form-item label="发布时间" prop="publishAt">
      <el-date-picker
        v-model="form.publishAt"
        type="datetime"
        :editable="false"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="发布时间"
      />
    </el-form-item>
    <el-form-item label="图文类型" prop="external">
      <el-radio-group v-model="form.external">
        <el-radio :label="false">自建图文</el-radio>
        <el-radio :label="true">公众号文章</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="图文简介" prop="summary">
      <el-input
        v-model="form.summary"
        type="textarea"
        maxlength="45"
        class="w-64"
        show-word-limit
        :autosize="{ minRows: 4, maxRows: 6 }"
      />
    </el-form-item>
    <el-form-item
      v-if="form.external"
      label="公众号文章链接"
      prop="link"
      :rules="[{ required: true, message: '请输入公众号文章链接' }]"
    >
      <el-input
        v-model.trim="form.link"
        class="w-64"
        placeholder="公众号文章链接"
      />
    </el-form-item>
    <el-form-item v-else label="图文内容" prop="content">
      <Editor v-model="form.content" />
    </el-form-item>
  </div>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      goods: null,
      coupons: null,
      couponMore: true,
      couponPage: 1,
      goodsMore: true,
      goodsPage: 1,
      isInit: true,
    }
  },
  setup(ctx, context) {
    const result = useQuery([], context.root.api.merchants)
    return {
      ...result,
      merchants: result.data,
    }
  },
  mounted() {
    if (this.isInit && this.form.merchantId) {
      Promise.all([this.getCoupon(), this.getGoods()]).then(() => {
        this.isInit = false
      })
    }
  },
  methods: {
    getGoods({ page = 1, keyword = '' } = {}) {
      return new Promise(resolve => {
        // 访问后端接口API
        const params = {
          page,
          q: keyword,
          merchantId: this.form.merchantId,
        }
        this.api.merchantGoods(params).then(({ total, items }) => {
          const goods = this.goods || []
          if (keyword) {
            this.goods = [...items]
          } else {
            const goodsTotal = [...goods, ...items]
            const res = new Map()
            this.goods = goodsTotal.filter(
              item => !res.has(item.id) && res.set(item.id, 1)
            )
          }
          this.goodsMore = this.goods.length < total
          this.goodsPage = page
          resolve()
        })
      })
    },
    getCoupon({ page = 1, keyword = '' } = {}) {
      return new Promise(resolve => {
        // 访问后端接口API
        const params = {
          page,
          q: keyword,
          merchantId: this.form.merchantId,
          activityTypes: [
            this.consts.NORMAL,
            this.consts.ONLY_NEWBIE,
            this.consts.COLLECT,
            this.consts.INVITE,
          ],
          giveOutPatterns: [this.consts.PUBLIC],
        }
        this.api.merchantCoupons(params).then(({ total, items }) => {
          const coupons = this.coupons || []
          if (keyword) {
            this.coupons = [...items]
          } else {
            const couponsTotal = [...coupons, ...items]
            const res = new Map()
            this.coupons = couponsTotal.filter(
              item => !res.has(item.id) && res.set(item.id, 1)
            )
          }
          this.couponMore = this.coupons.length < total
          this.couponPage = page
          resolve()
        })
      })
    },
    changeMerchant() {
      this.form.targetType = null
      this.form.targetId = null
    },
    changeTargetType() {
      this.form.targetId = null
      if ([this.consts.GOODS].includes(this.form.targetType)) {
        this.getGoods()
      }
      if ([this.consts.COUPON].includes(this.form.targetType)) {
        this.getCoupon()
      }
    },
  },
}
</script>
<style scoped></style>
