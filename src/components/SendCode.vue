<template>
  <el-button :disabled="invalidMobile || disableSendCode" @click="sendCode">
    {{ codeText }}
  </el-button>
</template>
<script>
import { sendCode } from '@/api'
import { mobilePattern } from '@/utils/validator'
export default {
  props: {
    mobile: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      disableSendCode: false,
      codeText: '获取验证码',
    }
  },
  computed: {
    invalidMobile() {
      return !mobilePattern.test(this.mobile)
    },
  },
  methods: {
    sendCode() {
      this.disableSendCode = true
      sendCode(this.mobile)
        .then(ok => {
          if (ok) {
            let count = 60
            this.codeText = `已发送(${count}s)`
            const interval = setInterval(() => {
              --count
              this.codeText = `已发送(${count}s)`
              if (count === 0) {
                this.codeText = '发送验证码'
                this.disableSendCode = false
                clearInterval(interval)
              }
            }, 1000)
          } else {
            this.disableSendCode = false
            this.codeText = '发送验证码'
          }
        })
        .catch(() => {
          this.disableSendCode = false
        })
    },
  },
}
</script>

<style>
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  color: #7e8188;
  background: #ebeef5;
}
</style>
