export const mobilePattern = /^1(3|5|6|7|8|9)[0-9]\d{8}$/

export const mobileValidator = [
  {
    required: true,
    message: '账号不能为空',
    trigger: 'blur',
  },
  {
    pattern: mobilePattern,
    message: '手机号格式不正确',
    trigger: 'blur',
  },
]

export const codeValidator = [
  {
    required: true,
    message: '请填写验证码',
    trigger: 'blur',
  },
  {
    pattern: /^\d{6}$/,
    message: '验证码是由6位数字组成的',
    trigger: 'blur',
  },
]
