<template>
  <div>
    <el-form-item
      label="名称"
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
      <span class="text-sm text-gray-600">图片建议尺寸：690*280</span>
    </el-form-item>
    <el-form-item
      label="关联商家"
      prop="merchantId"
      :rules="[{ required: true, message: '请选择商家' }]"
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
    <template v-if="form.merchantId">
      <el-form-item label="跳转类型" prop="isArticle">
        <el-radio-group v-model="form.isArticle" @change="changeType">
          <el-radio :label="true">图文内容</el-radio>
          <el-radio :label="false">商家活动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.isArticle && articles"
        label="图文内容"
        prop="targetId"
        :rules="[{ required: true, message: '请选择图文内容' }]"
      >
        <el-select v-model="form.targetId">
          <el-option
            v-for="(article, index) of articles"
            :key="index"
            :label="article.title"
            :value="article.id.toString()"
          />
        </el-select>
      </el-form-item>
      <div v-else class="flex">
        <el-form-item
          label="跳转类型"
          prop="targetType"
          :rules="[{ required: true, message: '请选择跳转类型' }]"
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
            v-model="form.targetId"
            :data="coupons"
            :page="couponPage"
            :has-more="couponMore"
            :request="getCoupon"
            type="coupon"
          />
        </el-form-item>
      </div>
    </template>
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
      articles: null,
    }
  },
  mounted() {
    if (this.isInit && this.form.merchantId) {
      this.isInit = false
      if (this.form.targetType === this.consts.COUPON) {
        this.getCoupon()
      }
      if (this.form.targetType === this.consts.GOODS) {
        this.getGoods()
      }
      if (this.form.isArticle) {
        this.fetchArticle()
      }
    }
  },
  setup(ctx, context) {
    const result = useQuery([], context.root.api.merchants)
    return {
      ...result,
      merchants: result.data,
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
    changeMerchant(e) {
      this.form.targetType = null
      this.form.targetId = null
      if (this.form.isArticle) {
        this.fetchArticle()
      }
    },
    changeType() {
      this.form.targetType = null
      this.form.targetId = null
      if (this.form.merchantId) {
        this.fetchArticle()
      }
    },
    fetchArticle() {
      const params = {
        perPage: 99,
        merchantId: this.form.merchantId,
      }
      this.api.articles({ params }).then(({ items }) => {
        this.articles = items
      }, this.$error)
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
