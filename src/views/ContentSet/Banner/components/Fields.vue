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
      <span class="text-grey-dark text-xs">
        图片建议尺寸：750*422像素；图片建议比例：16:9
      </span>
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
    <div v-if="form.merchantId">
      <el-form-item label="跳转类型" prop="isArticle">
        <el-radio-group v-model="form.isArticle">
          <el-radio :label="true">图文内容</el-radio>
          <el-radio :label="false">商家活动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.isArticle"
        label="图文内容"
        prop="targetId"
        :rules="[{ required: true, message: '请选择图文内容' }]"
      >
        <el-select v-model="form.targetId">
          <el-option
            v-for="(article, index) of articles"
            :key="index"
            :label="article.name"
            :value="article.id"
          />
        </el-select>
      </el-form-item>
      <div v-else class="flex">
        <el-form-item
          label="跳转类型"
          prop="targetType"
          :rules="[{ required: true, message: '请选择跳转类型' }]"
        >
          <el-select v-model="form.targetType">
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
            :merchant-id="form.merchantId"
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
            :merchant-id="form.merchantId"
          />
        </el-form-item>
      </div>
    </div>
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
      goods: [],
      coupons: [],
      couponMore: true,
      couponPage: 1,
      goodsMore: true,
      goodsPage: 1,
    }
  },
  setup(ctx, context) {
    const params = {
      perPage: 99,
    }
    const result = useQuery([], context.root.api.merchants)
    const articles = useQuery([], () => context.root.api.articles(params))
    return {
      ...result,
      merchants: result.data,
      ...articles,
      articles: articles.items,
    }
  },
  methods: {
    getGoods({ page = 1, goodsMore = false, keyword = '' } = {}) {
      return new Promise(resolve => {
        // 访问后端接口API
        const params = {
          page,
          q: keyword,
        }
        this.api.merchantGoods({ page, keyword }).then(({ total, items }) => {
          if (goodsMore) {
            this.goods = [...this.data, ...items]
          } else {
            this.goods = items
          }
          this.goodsMore = page * 10 < total
          this.goodsPage = page
          resolve()
        })
      })
    },
    getCoupon({ page = 1, couponMore = false, keyword = '' } = {}) {
      return new Promise(resolve => {
        // 访问后端接口API
        const params = {
          page,
          q: keyword,
        }
        this.api.merchantCoupons(params).then(({ total, items }) => {
          if (couponMore) {
            this.coupons = [...this.coupons, ...items]
          } else {
            this.coupons = items
          }
          this.couponMore = page * 10 < total
          this.coupnPage = page
          resolve()
        })
      })
    },

    changeMerchant() {
      this.form.targetType = null
      this.form.targetId = null
    },
  },
}
</script>
<style scoped></style>
