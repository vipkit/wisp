<template>
  <div class="flex flex-col h-screen w-full">
    <div class="flex-1 flex items-center justify-center">
      <div class="form bg-white shadow-lg">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="left"
          status-icon
          label-width="80px"
          @submit.prevent.native="submit"
        >
          <el-form-item label="手机号" prop="mobile" for="mobile">
            <el-input
              id="mobile"
              v-model.trim="form.mobile"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="code" for="code">
            <div class="flex">
              <el-input
                id="code"
                v-model.trim="form.code"
                placeholder="请输入6位验证码"
              >
                <SendCode slot="append" :mobile="form.mobile" />
              </el-input>
            </div>
          </el-form-item>
          <el-button class="load" type="primary" native-type="submit"
            >登录</el-button
          >
          <div class="flex flex-row-reverse">
            <router-link to="/login" class="text-gray-700 text-sm my-2">
              密码登录
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
    <PageFooter />
  </div>
</template>
<script>
import { mobileValidator, codeValidator } from '@/utils/validator'
import SendCode from '@/components/SendCode'
import PageFooter from '@/components/PageFooter'

export default {
  components: {
    SendCode,
    PageFooter,
  },
  data() {
    return {
      form: {
        mobile: '',
        code: '',
      },
      rules: {
        mobile: mobileValidator,
        code: codeValidator,
      },
    }
  },
  mounted() {
    if (window.localStorage.wisp_token) this.$router.push('/articles')
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('login', this.form)
            .then(() => {
              this.$router.push(this.$route.query.redirect || '/articles')
            })
            .catch(error => {
              if (error.code === 3004) {
                this.$message.error('该账号尚未注册')
                return
              }
              this.$error(error)
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  max-width: 500px;
  width: 90vw;
  padding: 2rem;
}
.load {
  width: 100%;
}
.greyLink {
  text-decoration: none;
}
</style>
