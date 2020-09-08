<template>
  <div class="flex flex-col h-screen">
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
          <el-form-item label="账号" for="login" prop="login">
            <el-input
              id="login"
              v-model.trim="form.login"
              placeholder="请输入注册手机号码/商家用户名"
            />
          </el-form-item>
          <el-form-item label="密码" for="pwd" prop="password">
            <el-input
              id="pwd"
              v-model.trim="form.password"
              placeholder="请输入密码"
              type="password"
            />
          </el-form-item>
          <el-button type="primary" class="load" native-type="submit">
            登录
          </el-button>
          <div class="flex flex-row-reverse">
            <router-link to="/code_login" class="text-gray-700 text-sm my-2">
              验证码登录
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
    <div class="flex justify-center">
      <PageFooter />
    </div>
  </div>
</template>
<script>
import PageFooter from '@/components/PageFooter'

export default {
  components: {
    PageFooter,
  },

  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      rules: {
        login: {
          required: true,
          message: '账号不能为空',
          trigger: 'blur',
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        },
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
            .catch(({ response: { errors } }) => {
              errors.map(error => {
                if (error.code !== 5000)
                  return this.$message.error('账号或密码不正确')
              })
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
